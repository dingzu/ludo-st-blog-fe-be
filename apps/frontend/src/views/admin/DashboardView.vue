<template>
  <div class="dashboard-view">
    <h2>仪表板</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>总文章数</h3>
        <p class="stat-number">0</p>
      </div>
      <div class="stat-card">
        <h3>总分类数</h3>
        <p class="stat-number">0</p>
      </div>
      <div class="stat-card">
        <h3>总评论数</h3>
        <p class="stat-number">0</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// DashboardView.vue - 仪表板页面
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #007bff;
  margin: 10px 0;
}
</style>
