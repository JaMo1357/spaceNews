<template>
  <div class="page-header">
    <img class="logo" src="../assets/images/logo.svg" />
    <ul class="menu">
      <li v-for="(listItem, i) in menuArray"
        :key="i"
      >
        {{ listItem }}
      </li>
    </ul>

    <div class="search-bar">
      <div class="magnification">O</div>
      <input
        type="text"
        placeholder="Search..."
        v-model="searchText"
        @keyup="checkSearchInput"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
  const menuArray = ['home', 'articles', 'blogs', 'reports']
  const searchText = ref('')

  const checkSearchInput = (e: Event) => {
    e.preventDefault

    const value = (e.target as HTMLInputElement).value
    const regex = /^[a-zA-Z-]+$/;

    if (!regex.test(value)) {
      searchText.value = searchText.value.replace(/[^a-zA-Z-]/g, '')
    }
  }
</script>

<style lang="scss">
.page-header {
  width: 100%;
  background: #262626 0% 0% no-repeat padding-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;

  .logo {
    height: 54px;
    justify-self: start;
    margin-left: 60px;
  }

  .menu {
    text-transform: uppercase;
    list-style-type: none;
    display: inline-flex;
    font-weight: bold;

    li {
      padding: 0 20px;

      &:hover {
        color: #508AD5;
        cursor: pointer;
      }
    }
  }

  .search-bar {
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    margin-right: 60px;
    width: 211px;
    height: 60px;
    background: #303030;
    border-width: 0;
    border-radius: 20px;
    cursor: pointer;

    .magnification {
      margin: 15px;
      border: 2px solid #fff;
      height: 30px;
      width: 30px;
    }

    input {
      height: 100%;
      width: inherit;
      background: transparent;
      border: none;
      outline: none;
      font-size: 24px;
      color: #fff;
    }
  }
}
</style>