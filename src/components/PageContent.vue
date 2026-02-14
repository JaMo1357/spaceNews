
<template>
  <div class="page-content">
    <LatestArticle :latestArticle="latestArticle" />
    <ArticleList :articles="articles" />
  </div>
</template>

<script async setup lang="ts">
import { ref } from 'vue'
import LatestArticle from '@/components/LatestArticle.vue'
import ArticleList from '@/components/ArticleList.vue'
import { apiGet, ARTICLES_ENDPOINT } from '@/services/http.service'
import { NewsArticle, articlesResponse } from '@/types'

const articles = ref<NewsArticle[]>([])

const latestArticle = ref<NewsArticle>({} as NewsArticle)

try {
  const response = await apiGet<articlesResponse>(ARTICLES_ENDPOINT)
  latestArticle.value = response.results[0] || {}
  articles.value = response.results
} catch (error) {
  console.error(error)
}
</script>

<style lang="scss">
.page-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  & > * {
    width: 100%;
  }
}
</style>