import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiGet, ARTICLES_ENDPOINT } from '@/services/http.service'
import { NewsArticle, articlesResponse } from '@/types'

export const usePaginationStore = defineStore('pagination', () => {
  const itemsPerPage = 12

  const articles = ref<NewsArticle[]>([])
  const latestArticle = ref<NewsArticle>({} as NewsArticle)
  const totalCount = ref(0)
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage))

  async function goToPage(page: number) {
    const offset = (page - 1) * itemsPerPage
    try {
      const response = await apiGet<articlesResponse>(ARTICLES_ENDPOINT, itemsPerPage, offset)
      articles.value = response.results
      latestArticle.value = response.results[0] || {}
      totalCount.value = response.count
      currentPage.value = page
    } catch (error) {
      console.error(error)
    }
  }

  async function init() {
    if (articles.value.length > 0) return // already loaded, preserve state
    await goToPage(1)
  }

  return {
    articles,
    latestArticle,
    totalCount,
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    init,
  }
})
