
<template>
  <div class="page-wrapper">
    <PageHeader />
    <main>
      <PageContent />
    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <span class="footer-brand">SpaceNews</span>
        <span class="footer-copy">© {{ currentYear }} — Powered by
          <a href="https://www.spaceflightnewsapi.net/" target="_blank" rel="noopener">
            Spaceflight News API
          </a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import PageHeader from './PageHeader.vue'
import PageContent from './PageContent.vue'

const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.site-footer {
  border-top: 1px solid var(--border-subtle);
  padding: 32px 40px;
  background: var(--bg-surface);
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-brand {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.footer-copy {
  font-size: 13px;
  color: var(--text-muted);

  a {
    color: var(--accent);
    font-weight: 500;
    transition: color var(--transition);

    &:hover {
      color: var(--accent-hover);
    }
  }
}
</style>