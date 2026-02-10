<template>
  <section class="articles-section">
    <div class="section-header">
      <h2 class="section-title">Latest News</h2>
      <div class="section-line"></div>
      <div class="view-toggle">
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'tile' }"
          @click="viewMode = 'tile'"
          aria-label="Grid view"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
            <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
            <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
            <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
        <button
          class="toggle-btn"
          :class="{ active: viewMode === 'row' }"
          @click="viewMode = 'row'"
          aria-label="List view"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="16" height="4" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
            <rect x="1" y="7" width="16" height="4" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
            <rect x="1" y="13" width="16" height="4" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
    </div>
    <div
      class="article-list"
      :class="`article-list--${viewMode}`"
    >
      <ArticleTile
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :viewMode="viewMode"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleTile from '@/components/ArticleTile.vue'
import type { article } from '@/types'

// eslint-disable-next-line vue/no-setup-props-destructure
const { articles } = defineProps<{
  articles?: Array<article>
}>()

const viewMode = ref<'tile' | 'row'>('tile')
</script>

<style lang="scss" scoped>
.articles-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px 80px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  margin: 0;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--border-subtle) 0%,
    transparent 100%
  );
}

/* ── View Toggle ─────────────────────────────────── */
.view-toggle {
  display: flex;
  gap: 4px;
  background: var(--bg-elevated);
  border-radius: 10px;
  padding: 4px;
  border: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    color: var(--text-secondary);
    background: var(--bg-surface);
  }

  &.active {
    color: var(--accent);
    background: var(--bg-surface);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }
}

/* ── Grid Layouts ────────────────────────────────── */
.article-list {
  transition: all 0.4s cubic-bezier(.4,0,.2,1);

  &--tile {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-auto-rows: 240px;
    gap: 24px;
  }

  &--row {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

/* ── Responsive: force tile on small screens ─────── */
@media (max-width: 600px) {
  .articles-section {
    padding: 32px 16px 60px;
  }

  .article-list--tile {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }

  .article-list--row {
    gap: 12px;
  }
}
</style>
