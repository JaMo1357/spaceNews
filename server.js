import 'dotenv/config';
import express from 'express';
import { neon } from '@neondatabase/serverless';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors()); // Allow your Vue app to talk to this server

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

const sql = neon(process.env.DATABASE_URL);


app.use(express.json());

// Initialize users table
(async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Users table initialized');
  } catch (err) {
    console.error('Error initializing users table:', err);
  }
})();

app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  console.log(`Register attempt for: ${email}`);
  try {
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      console.log(`User already exists: ${email}`);
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await sql`
      INSERT INTO users (email, password_hash, full_name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING user_id, email, full_name, created_at
    `;
    console.log(`User registered successfully: ${email}`);
    res.json(result[0]);
  } catch (err) {
    console.error('Register error details:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = users[0];

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const { password_hash: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await sql`SELECT user_id, email, full_name, created_at FROM users`;
    res.json(result);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Handle all other routes by serving index.html (SPA support)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Only listen if running directly (not imported as a module)
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;