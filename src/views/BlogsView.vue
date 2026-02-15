<template>
  <div class="blogs-view">
    <BlogList :blogs="blogs" />
  </div>
</template>

<script async setup lang="ts">
import { ref } from 'vue'
import BlogList from '@/components/BlogList.vue'
import { apiGet, BLOGS_ENDPOINT } from '@/services/http.service'
import { Blog, blogsResponse } from '@/types'

const blogs = ref<Blog[]>([])

try {
  const response = await apiGet<blogsResponse>(BLOGS_ENDPOINT)
  blogs.value = response.results
} catch (error) {
  console.error(error)
}
</script>

<style lang="scss">
.blogs-view {
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
