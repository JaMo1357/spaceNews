<template>
  <div class="pagination" v-if="totalPages > 1">
    <button
      v-for="item in visibleItems"
      :key="item.key"
      class="pagination-btn"
      :class="{ active: item.page === currentPage, dots: item.type === 'dots' }"
      :disabled="item.type === 'dots'"
      @click="item.type === 'page' && item.page != null && $emit('page-change', item.page)"
    >
      {{ item.type === 'dots' ? '...' : item.page }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'page-change', page: number): void
}>()

interface PaginationItem {
  key: string
  type: 'page' | 'dots'
  page?: number
}

const visibleItems = computed<PaginationItem[]>(() => {
  const current = props.currentPage
  const total = props.totalPages
  const items: PaginationItem[] = []

  if (total <= 4) {
    // Show all pages if 4 or fewer
    for (let i = 1; i <= total; i++) {
      items.push({ key: `p${i}`, type: 'page', page: i })
    }
    return items
  }

  if (current <= 2) {
    // Show first 3, dots, last
    for (let i = 1; i <= 3; i++) {
      items.push({ key: `p${i}`, type: 'page', page: i })
    }
    items.push({ key: 'dots', type: 'dots' })
    items.push({ key: `p${total}`, type: 'page', page: total })
  } else if (current >= total - 1) {
    // Near the end: 1 ... last-2, last-1, last
    items.push({ key: 'p1', type: 'page', page: 1 })
    items.push({ key: 'dots-start', type: 'dots' })
    const start = Math.max(total - 2, 2)
    for (let i = start; i <= total; i++) {
      items.push({ key: `p${i}`, type: 'page', page: i })
    }
  } else {
    // Middle: 1 ... prev, current, next ... last
    items.push({ key: 'p1', type: 'page', page: 1 })
    if (current - 1 > 2) {
      items.push({ key: 'dots-start', type: 'dots' })
    }
    items.push({ key: `p${current - 1}`, type: 'page', page: current - 1 })
    items.push({ key: `p${current}`, type: 'page', page: current })
    items.push({ key: `p${current + 1}`, type: 'page', page: current + 1 })
    items.push({ key: 'dots-end', type: 'dots' })
    items.push({ key: `p${total}`, type: 'page', page: total })
  }

  return items
})
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 20px 0 28px;
  width: 100%;
}

.pagination-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  padding: 0 6px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: #6c8cff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s ease;
  line-height: 1;

  &:hover:not(.dots):not(.active) {
    background: rgba(108, 140, 255, 0.08);
    border-color: rgba(108, 140, 255, 0.3);
  }

  &.active {
    background: #6c8cff;
    color: #fff;
    font-weight: 600;
  }

  &.dots {
    border: none;
    cursor: default;
    color: #6c8cff;
    opacity: 0.5;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>
