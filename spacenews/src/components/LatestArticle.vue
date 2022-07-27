<template>
  <div
    class="latestArticleWrapper"
    :style="articleWrapperStyle"
  >
    <div class="latestArticle">
      <div class="pageSection">
        <span class="latestSection">ARTICLES</span>
        <span class="latestSite">{{ latestArticle.newsSite }}</span>
      </div>
      <h1 class="articleTitle">
        {{ latestArticle.title }}
      </h1>
      <span class="publishedAt">
        {{ publishedAt }}
      </span>
      <p class="articleSummary">
        {{ latestArticle.summary }}
      </p>

      <span class="readMore">Read more</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { article } from '@/types'
import { defineProps } from 'vue';

const props = defineProps<{
  latestArticle?: article
}>()

const publishedAt = new Date(props.latestArticle?.publishedAt).toISOString().split('T')[0]

const gradient = 'linear-gradient(90deg, rgba(38,38,38,1) 30%, rgba(0,0,0,0.20211834733893552) 100%)'

const articleWrapperStyle = {
  background: `${gradient}, url(${props.latestArticle.imageUrl})`,
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}
</script>

<style lang="scss" scoped>
.latestArticleWrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  
  .latestSection {
    text-transform: uppercase;
    color: grey;
    font-weight: bold;
  }

  .latestSite {
    color: #508AD5;
    margin-left: 20px;
    font-weight: bold;
  }

  .articleWrapperImage {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .latestArticle {
    padding: 100px;
    flex-direction: column;
    display: flex;
    width: 600px;

    .publishedAt {
      color: grey;
    }
    .articleSummary {
      color: grey;
      text-align: left;
    }

    .readMore {
      color: #508AD5;
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
