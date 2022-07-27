<template>
  <div class="articleList">
    <ArticleTile
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script setup lang="ts">
import ArticleTile from '@/components/ArticleTile.vue'
import { article } from '@/types'
import { defineProps } from 'vue';

// eslint-disable-next-line vue/no-setup-props-destructure
const { articles } = defineProps<{
  articles?: Array<article>
}>()
</script>

<style lang="scss" scoped>
.articleList {
  flex: auto;
  max-width: 100%;
  margin: 100px;
  display: grid;
  justify-content: stretch;
  grid-template-columns: repeat(auto-fit, minmax(324px, 1fr));
  grid-auto-rows: 224px;
  gap: 37px;
}
</style>
