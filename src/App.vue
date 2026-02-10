<template>
  <Suspense>
    <PageBody />
    <template #fallback>
      <div class="loading-screen">
        <div class="spinner"></div>
        <span class="loading-text">Loading SpaceNews…</span>
      </div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageBody from './components/PageBody.vue';

export default defineComponent({
  name: 'App',
  components: {
    PageBody,
  }
});
</script>

<style>
/* ── Design Tokens ───────────────────────────────── */
:root {
  --bg-primary:    #0d0d12;
  --bg-surface:    #16161e;
  --bg-elevated:   #1e1e28;
  --bg-glass:      rgba(22, 22, 30, 0.65);
  --accent:        #6c8cff;
  --accent-hover:  #8ba3ff;
  --accent-glow:   rgba(108, 140, 255, 0.25);
  --text-primary:  #eaeaf0;
  --text-secondary:#8888a0;
  --text-muted:    #555566;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --radius:        12px;
  --radius-lg:     20px;
  --transition:    0.3s cubic-bezier(.4,0,.2,1);
  --shadow-card:   0 2px 20px rgba(0,0,0,0.35);
  --shadow-hover:  0 8px 32px rgba(0,0,0,0.55);
  --font:          'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ── Global Reset ────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body, #app {
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background: var(--bg-primary);
  line-height: 1.6;
  min-height: 100vh;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition);
}
a:hover {
  color: var(--accent-hover);
}

/* ── Loading Screen ──────────────────────────────── */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 24px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-subtle);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
</style>
