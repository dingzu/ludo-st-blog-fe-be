<template>
  <div class="tag-view">
    <h1>标签页面</h1>
    <p>这里将显示标签下的文章列表</p>
    <p>标签: {{ $route.params.slug }}</p>
  </div>
</template>

<script setup lang="ts">
// TagView.vue - 标签页面
</script>

<style scoped>
.tag-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
