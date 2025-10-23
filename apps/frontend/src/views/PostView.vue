<template>
  <div class="post-view">
    <h1>文章详情页</h1>
    <p>这里将显示文章内容</p>
    <p>文章ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
// PostView.vue - 文章详情页面
</script>

<style scoped>
.post-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
