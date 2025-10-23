<template>
  <div class="category-view">
    <h1>分类页面</h1>
    <p>这里将显示分类下的文章列表</p>
    <p>分类: {{ $route.params.slug }}</p>
  </div>
</template>

<script setup lang="ts">
// CategoryView.vue - 分类页面
</script>

<style scoped>
.category-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
