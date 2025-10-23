<template>
  <div class="admin-layout">
    <h1>管理后台</h1>
    <nav class="admin-nav">
      <router-link to="/admin">仪表板</router-link>
      <router-link to="/admin/posts">文章管理</router-link>
      <router-link to="/admin/categories">分类管理</router-link>
    </nav>
    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// AdminLayout.vue - 管理后台布局
</script>

<style scoped>
.admin-layout {
  padding: 20px;
}

.admin-nav {
  margin-bottom: 20px;
}

.admin-nav a {
  margin-right: 20px;
  padding: 10px 15px;
  background: #f0f0f0;
  text-decoration: none;
  border-radius: 4px;
}

.admin-nav a.router-link-active {
  background: #007bff;
  color: white;
}

.admin-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
