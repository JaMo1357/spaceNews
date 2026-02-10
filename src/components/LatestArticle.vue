<template>
  <div
    class="latest-article"
    :style="articleWrapperStyle"
  >
    <div class="latest-article-content">
      <div class="page-section">
        <span class="latest-section">ARTICLES</span>
        <span class="latest-site">{{ latestArticle?.news_site }}</span>
      </div>
      <h1 class="article-title">
        {{ latestArticle?.title }}
      </h1>
      <span class="published-at">
        {{ publishedAt }}
      </span>
      <p class="article-summary">
        {{ latestArticle?.summary }}
      </p>

      <span class="read-more">Read more</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  latestArticle?: article
}>()

const publishedAt = computed(() => {
  return props.latestArticle?.published_at
    ? new Date(props.latestArticle.published_at).toISOString().split('T')[0]
    : ''
})

const gradient = 'linear-gradient(90deg, rgba(38,38,38,1) 30%, rgba(0,0,0,0.20211834733893552) 100%)'

const articleWrapperStyle = computed(() => {
  return {
    background: `${gradient}, url(${props.latestArticle?.image_url})`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
})
</script>

<style lang="scss" scoped>
.latest-article {
  display: flex;
  flex-direction: row;
  width: 100%;

  .latest-section {
    text-transform: uppercase;
    color: grey;
    font-weight: bold;
  }

  .latest-site {
    color: #508AD5;
    margin-left: 20px;
    font-weight: bold;
  }

  .latest-article-content {
    background: #ffffff14;
    padding: 15px;
    margin: 25px;
    flex-direction: column;
    display: flex;
    width: 600px;

    .published-at {
      color: grey;
    }
    .article-summary {
      color: #e1e1e1;
      text-align: left;
    }

    .read-more {
      color: #508AD5;
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
