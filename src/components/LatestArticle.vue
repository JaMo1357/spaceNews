<template>
  <section
    class="hero"
    :style="heroStyle"
  >
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-meta">
        <span class="badge">Latest Article</span>
        <span class="site-name">{{ latestArticle?.news_site }}</span>
      </div>
      <h1 class="hero-title">
        {{ latestArticle?.title }}
      </h1>
      <time class="hero-date">
        {{ publishedAt }}
      </time>
      <p class="hero-summary">
        {{ latestArticle?.summary }}
      </p>
      <a :href="latestArticle?.url" target="_blank" rel="noopener" class="cta-button">
        Read Full Article
        <span class="cta-arrow">→</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NewsArticle } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  latestArticle?: NewsArticle
}>()

const publishedAt = computed(() => {
  if (!props.latestArticle?.published_at) return ''
  const date = new Date(props.latestArticle.published_at)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const heroStyle = computed(() => {
  if (!props.latestArticle?.image_url) return {}
  return {
    backgroundImage: `url(${props.latestArticle.image_url})`,
  }
})
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(13, 13, 18, 0.3) 0%,
    rgba(13, 13, 18, 0.6) 40%,
    rgba(13, 13, 18, 0.95) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  padding: 60px 60px 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 14px;
}

.badge {
  display: inline-block;
  padding: 5px 14px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 100px;
}

.site-name {
  color: var(--accent-hover);
  font-weight: 600;
  font-size: 14px;
}

.hero-title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  margin: 0;
}

.hero-date {
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.hero-summary {
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  margin-top: 8px;
  padding: 14px 28px;
  background: var(--accent);
  color: #fff;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition);

  &:hover {
    background: var(--accent-hover);
    box-shadow: 0 4px 24px var(--accent-glow);
    transform: translateY(-1px);
    color: #fff;
  }

  .cta-arrow {
    transition: transform var(--transition);
  }

  &:hover .cta-arrow {
    transform: translateX(4px);
  }
}
</style>
