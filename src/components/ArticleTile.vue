<template>
  <div class="article-tile">
    <img
      :src="props.article?.image_url"
      :alt="props.article?.news_site"
    />
  </div>
</template>

<script setup lang="ts">
import { article } from '@/types'
import { ref } from 'vue';

const props = defineProps<{
  article?: article
}>()
</script>

<style lang="scss" scoped>
.article-tile {
  display: block;
  object-fit: cover;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 0 3px 0 white;
    }
  }
}
</style>
