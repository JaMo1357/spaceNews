<template>
  <div
    class="articleTile"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img
      :src="props.article?.image_url"
      :alt="props.article?.news_site"
      :class="[isHovered ? 'hovered' : '']"
    />
  </div>
</template>

<script setup lang="ts">
import { article } from '@/types'
import { ref } from 'vue';

const props = defineProps<{
  article?: article
}>()

const isHovered = ref(false)
</script>

<style lang="scss" scoped>
.articleTile {
  display: block;
  object-fit: cover;
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s;

  &.hovered {
    transform: scale(1.1);
    border: 3px solid white;
  }
}
</style>
