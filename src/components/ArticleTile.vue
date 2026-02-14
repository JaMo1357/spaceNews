<template>
  <div
    class="article-tile"
    :class="[
      `article-tile--${viewMode}`,
      { 'article-tile--hovered': isHovered }
    ]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="goToArticle"
  >
    <!-- Shared: background image -->
    <div
      class="article-tile__image"
      :style="{ backgroundImage: `url(${props.article?.image_url})` }"
    ></div>

    <!-- Tile mode: overlay gradient + title at bottom -->
    <template v-if="viewMode === 'tile'">
      <div class="article-tile__overlay"></div>
      <div class="article-tile__content">
        <div class="article-tile__title">
          <span>{{ props.article?.title }}</span>
        </div>
        <div class="article-tile__meta-info">
          <div class="meta-row">
            <span class="meta-label">By</span>
            <span class="meta-value">{{ authorsText }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">On</span>
            <span class="meta-value">{{ formattedDate }}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Source</span>
            <span class="meta-value">{{ props.article?.news_site }}</span>
          </div>
        </div>
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
        <span
          class="article-tile__link" >
          Read article →
        </span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { NewsArticle } from '@/types'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  article?: NewsArticle
  viewMode?: 'tile' | 'row'
}>()

const router = useRouter()
const isHovered = ref(false)

const goToArticle = () => {
  if (props.article?.id) {
    router.push({ name: 'Article', params: { id: props.article.id } })
  }
}

const formattedDate = computed(() => {
  if (!props.article?.published_at) return ''
  return new Date(props.article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const authorsText = computed(() => {
  if (!props.article?.authors || props.article.authors.length === 0) return 'Unknown Author'
  return props.article.authors.map(a => a.name).join(', ')
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
  aspect-ratio: 3 / 2;
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
      rgba(13, 13, 18, 0) 10%,
      rgba(13, 13, 18, 0.7) 40%,
      rgba(13, 13, 18, 0.98) 100%
    );
  }

  .article-tile__content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transform: translateY(calc(100% - 80px)); /* Show only title by default */
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &.article-tile--hovered .article-tile__content {
    transform: translateY(0);
  }

  .article-tile__title span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--text-primary);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
  }

  &.article-tile--hovered .article-tile__title span {
    -webkit-line-clamp: unset; /* Expand to show full title */
    line-clamp: unset;
  }

  .article-tile__meta-info {
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;

    > * {
      overflow: hidden;
    }
  }

  &.article-tile--hovered .article-tile__meta-info {
    opacity: 1;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Vertically center items */
    font-size: 13px;
    color: var(--text-secondary);
    padding: 2px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }

  .meta-label {
    font-weight: 600;
    color: var(--text-muted);
    margin-right: 8px;
  }

  .meta-value {
    color: var(--text-primary);
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
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
    line-clamp: 2;
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
    line-clamp: 2;
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
