
<template>
  <div class="page-content">
    <LatestArticle v-if="!store.isSearchActive" :latestArticle="store.latestArticle" />
    <ArticleList :articles="store.articles" />

    <Pagination
      :currentPage="store.currentPage"
      :totalPages="store.totalPages"
      @page-change="store.goToPage"
    />
  </div>
</template>

<script async setup lang="ts">
import LatestArticle from '@/components/LatestArticle.vue'
import ArticleList from '@/components/ArticleList.vue'
import Pagination from '@/components/Pagination.vue'
import { usePaginationStore } from '@/stores/pagination'

const store = usePaginationStore()
await store.init()
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