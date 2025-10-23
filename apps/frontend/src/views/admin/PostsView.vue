<template>
  <div class="posts-view">
    <h2>文章管理</h2>
    <div class="posts-actions">
      <router-link to="/admin/posts/new" class="btn-primary">新建文章</router-link>
    </div>
    <div class="posts-list">
      <p>文章列表将在这里显示</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// PostsView.vue - 文章管理页面
</script>

<style scoped>
.posts-view {
  padding: 20px;
}

.posts-actions {
  margin-bottom: 20px;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
}

.posts-list {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}
</style>
