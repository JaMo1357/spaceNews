<template>
  <div
      class="article-tile"
      :class="{ 'article-tile--hovered': isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false">
    <div
      class="article-tile__background"
      :style="{ backgroundImage: `url(${props.article?.image_url})` }">
    </div>
    <div class="article-tile__title">
      <span>{{ props.article?.title }}</span>
    </div>
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
.article-tile {
  display: block;
  cursor: pointer;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-size: cover;

  &--hovered {
    .article-tile {
      &__title {
        transition: all 1.5s;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.914) 100%);
      }

      &__background {
        transform: scale(1.1);
      }
    }
  }


  &__background {
    height: 100%;
    width: 100%;
    background-size: cover;
    transition: transform 1.5s;
  }

  &__title {
    display: flex;
    align-items: center;
    color: #e1e1e1;
    font-weight: bold;
    padding: 30px 15px 15px 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgb(0 0 0 / 49%) 50%, rgba(0, 0, 0, 0.8) 100%);
    z-index: 10;
    justify-content: flex-end;
  }
}
</style>
