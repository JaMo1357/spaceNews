
<template>
  <PageHeader />
  <PageContent />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from './PageHeader.vue'
import PageContent from './PageContent.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    PageContent,
  }
});
</script>

<style>
#app, body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  color: #fff;
  background: #262626;
}

</style>
