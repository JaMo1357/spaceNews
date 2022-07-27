<template>
  <Suspense>
    <PageBody />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageBody from './components/PageBody.vue';

export default defineComponent({
  name: 'App',
  components: {
    PageBody,
  }
});
</script>

<style>
#app, body {
  font-family: Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  color: #fff;
  background: #262626;
}
</style>
