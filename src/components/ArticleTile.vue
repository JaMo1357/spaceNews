<template>
  <div
    class="article-tile"
    :class="[
      `article-tile--${viewMode}`,
      { 'article-tile--hovered': isHovered }
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Shared: background image -->
    <div
      class="article-tile__image"
      :style="{ backgroundImage: `url(${props.article?.image_url})` }"
    ></div>

    <!-- Tile mode: overlay gradient + title at bottom -->
    <template v-if="viewMode === 'tile'">
      <div class="article-tile__overlay"></div>
      <div class="article-tile__title">
        <span>{{ props.article?.title }}</span>
      </div>
    </template>

    <!-- Row mode: content beside the image -->
    <template v-else>
      <div class="article-tile__body">
        <div class="article-tile__meta">
          <span class="article-tile__site">{{ props.article?.news_site }}</span>
          <span class="article-tile__date">{{ formattedDate }}</span>
        </div>
        <h3 class="article-tile__heading">{{ props.article?.title }}</h3>
        <p class="article-tile__summary">{{ props.article?.summary }}</p>
        <a
          :href="props.article?.url"
          target="_blank"
          rel="noopener"
          class="article-tile__link"
          @click.stop
        >
          Read article →
        </a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { article } from '@/types'
import { ref, computed } from 'vue'

const props = defineProps<{
  article?: article
  viewMode?: 'tile' | 'row'
}>()

const isHovered = ref(false)

const formattedDate = computed(() => {
  if (!props.article?.published_at) return ''
  return new Date(props.article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>

<style lang="scss" scoped>
/* ═══════════════════════════════════════════════════
   SHARED
   ═══════════════════════════════════════════════════ */
.article-tile {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  cursor: pointer;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
  transition: all var(--transition);

  &:hover {
    border-color: rgba(108, 140, 255, 0.2);
    box-shadow: var(--shadow-hover), 0 0 0 1px rgba(108, 140, 255, 0.1);
  }
}

/* ═══════════════════════════════════════════════════
   TILE / GRID VIEW
   ═══════════════════════════════════════════════════ */
.article-tile--tile {
  .article-tile__image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.6s cubic-bezier(.4, 0, .2, 1);
  }

  &.article-tile--hovered .article-tile__image {
    transform: scale(1.08);
  }

  &:hover {
    transform: translateY(-4px);
  }

  .article-tile__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(13, 13, 18, 0) 30%,
      rgba(13, 13, 18, 0.5) 60%,
      rgba(13, 13, 18, 0.92) 100%
    );
    z-index: 1;
    transition: opacity var(--transition);
  }

  &.article-tile--hovered .article-tile__overlay {
    background: linear-gradient(
      180deg,
      rgba(13, 13, 18, 0) 20%,
      rgba(13, 13, 18, 0.6) 50%,
      rgba(13, 13, 18, 0.95) 100%
    );
  }

  .article-tile__title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 20px;

    span {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: var(--text-primary);
      font-size: 15px;
      font-weight: 600;
      line-height: 1.45;
    }
  }
}

/* ═══════════════════════════════════════════════════
   ROW / LIST VIEW
   ═══════════════════════════════════════════════════ */
.article-tile--row {
  display: flex;
  flex-direction: row;
  height: auto;
  border-radius: var(--radius);

  &:hover {
    transform: translateX(4px);
  }

  .article-tile__image {
    width: 260px;
    min-height: 160px;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    transition: transform 0.6s cubic-bezier(.4, 0, .2, 1);
  }

  &.article-tile--hovered .article-tile__image {
    transform: scale(1.05);
  }

  .article-tile__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 24px;
    min-width: 0;
  }

  .article-tile__meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  .article-tile__site {
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .article-tile__date {
    color: var(--text-muted);
  }

  .article-tile__heading {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.35;
    color: var(--text-primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-tile__summary {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-tile__link {
    margin-top: auto;
    align-self: flex-start;
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
    transition: color var(--transition);

    &:hover {
      color: var(--accent-hover);
    }
  }
}

/* ═══════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════ */
@media (max-width: 700px) {
  .article-tile--row {
    flex-direction: column;

    .article-tile__image {
      width: 100%;
      min-height: 180px;
    }
  }
}
</style>
