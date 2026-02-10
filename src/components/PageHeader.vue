<template>
  <header class="page-header">
    <div class="header-inner">
      <img class="logo" src="../assets/images/logo.svg" alt="SpaceNews logo" />

      <nav class="nav">
        <ul class="menu">
          <li v-for="(item, i) in menuArray" :key="i">
            <a href="#" :class="{ active: i === 0 }">{{ item }}</a>
          </li>
        </ul>
      </nav>

      <div class="search-bar" :class="{ focused: isSearchFocused }">
        <img class="search-icon" src="../assets/images/search.svg" alt="Search" />
        <input
          type="text"
          placeholder="Search articles…"
          v-model="searchText"
          @keyup="checkSearchInput"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuArray = ['Home', 'Articles', 'Blogs', 'Reports']
const searchText = ref('')
const isSearchFocused = ref(false)

const checkSearchInput = (e: Event) => {
  e.preventDefault
  const value = (e.target as HTMLInputElement).value
  const regex = /^[a-zA-Z-]+$/;
  if (!regex.test(value)) {
    searchText.value = searchText.value.replace(/[^a-zA-Z-]/g, '')
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  transition: background var(--transition);
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo {
  height: 40px;
  flex-shrink: 0;
  transition: opacity var(--transition);

  &:hover {
    opacity: 0.8;
  }
}

.nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.menu {
  list-style: none;
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0;

  li a {
    display: inline-block;
    padding: 8px 18px;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    text-decoration: none;
    position: relative;
    transition: color var(--transition);
    border-radius: 8px;

    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 18px;
      right: 18px;
      height: 2px;
      background: var(--accent);
      border-radius: 1px;
      transform: scaleX(0);
      transition: transform var(--transition);
    }

    &:hover,
    &.active {
      color: var(--text-primary);

      &::after {
        transform: scaleX(1);
      }
    }

    &.active {
      color: var(--accent);
    }
  }
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  width: 220px;
  height: 42px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 100px;
  transition: all var(--transition);

  &.focused,
  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
    background: var(--bg-surface);
  }

  .search-icon {
    width: 16px;
    height: 16px;
    opacity: 0.5;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--font);
    font-size: 14px;
    color: var(--text-primary);

    &::placeholder {
      color: var(--text-muted);
    }
  }
}
</style>