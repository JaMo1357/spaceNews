
<template>
  <div class="pageContent" >
    <LatestArticle :latestArticle="latestArticle" />
    <ArticleList :articles="articles" />
  </div>
</template>

<script async setup lang="ts">
import LatestArticle from '@/components/LatestArticle.vue'
import ArticleList from '@/components/ArticleList.vue'
import { apiGet, ARTICLES_ENDPOINT } from '@/services/http.service'
import { article } from './../types'

const articles: Array<article> = await apiGet(ARTICLES_ENDPOINT) || []
const latestArticle: article = articles[0] || {}
</script>

<style lang="scss">
.pageContent {
  display: flex; 
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>