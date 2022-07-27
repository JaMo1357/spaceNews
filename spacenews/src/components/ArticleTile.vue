<template>
  <div
    class="articleTile"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img
      :src="props.article?.imageUrl"
      :alt="props.article.newsSite"
      :class="[isHovered ? 'hovered' : '']"
    />
  </div>
</template>

<script setup lang="ts">
import { article } from '@/types'
import { defineProps, ref } from 'vue';

const props = defineProps<{
  article?: article
}>()

const isHovered = ref(false)

</script>

<style lang="scss" scoped>
.articleTile {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 224px;
  max-width: 324px;
  object-fit: cover;
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: height 0.3s, width 0.3s, margin 0.3s;

  &.hovered {
    width: 110%;
    height: 106%;
    margin-left: -5%;
    margin-top: -3%;
    border: 3px solid white;
  }
}
</style>
