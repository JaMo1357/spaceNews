import 'dotenv/config';
import express from 'express';
import { neon } from '@neondatabase/serverless';
import cors from 'cors';

const app = express();
app.use(cors()); // Allow your Vue app to talk to this server

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
    // In production, hash the password here (e.g. using bcrypt)
    const result = await sql`
      INSERT INTO users (email, password_hash, full_name)
      VALUES (${email}, ${password}, ${name})
      RETURNING id, email, full_name, created_at
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
    // In production, compare hashed password
    if (user.password_hash !== password) {
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

app.listen(3000, () => console.log('Server running on port 3000'));