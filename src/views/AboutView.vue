<template>
  <div class="about-page">
    <div class="about-container">
      <div class="hero-section">
        <h1>About <span class="text-accent">SpaceNews</span></h1>
        <p class="subtitle">Bringing the universe closer to you.</p>
      </div>

      <div class="content-section">
        <div class="card">
          <h2>Our Mission</h2>
          <p>
            SpaceNews is dedicated to providing the latest and most accurate updates from the aerospace industry.
            We aggregate news, blogs, and reports from trusted sources to keep you informed about humanity's journey to the stars.
          </p>
        </div>

        <div class="card">
          <h2>What We Cover</h2>
          <ul class="feature-list">
            <li>🚀 <strong>Launches:</strong> Real-time updates on rocket launches globally.</li>
            <li>🛰️ <strong>Missions:</strong> Deep dives into scientific missions and satellite deployments.</li>
            <li>🌌 <strong>Discovery:</strong> Breaking news on astronomical discoveries and research.</li>
            <li>💼 <strong>Industry:</strong> Commercial spaceflight and policy developments.</li>
          </ul>
        </div>

        <div class="card">
          <h2>Connect With Us</h2>
          <p>
            Have a story tip or feedback? We'd love to hear from you.
            <br>
            Email us at <a href="mailto:contact@spacenews.example.com">contact@spacenews.example.com</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  padding: 60px 20px;
  background: radial-gradient(circle at top right, rgba(108, 140, 255, 0.05), transparent 40%);
  min-height: 100%;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -1px;

    .text-accent {
      color: var(--accent);
    }
  }

  .subtitle {
    font-size: 20px;
    color: var(--text-secondary);
  }
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
  }

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 0;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;

  li {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 12px;

    strong {
      color: var(--text-primary);
    }
  }
}

a {
  color: var(--accent);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 36px;
  }
}
</style>
