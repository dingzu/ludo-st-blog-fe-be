<template>
  <div class="html-page">
    <div class="page-container">
      <div v-if="htmlContent" class="page-content" v-html="htmlContent"></div>
      <div v-else class="empty-state">
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  htmlContent?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.html-page {
  padding: 32px;
}

.page-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  padding: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  
  :deep(h1) {
    font-size: 36px;
    margin: 0 0 24px 0;
    color: #2c3e50;
    font-weight: 700;
  }
  
  :deep(h2) {
    font-size: 28px;
    margin: 32px 0 16px 0;
    color: #2c3e50;
  }
  
  :deep(h3) {
    font-size: 22px;
    margin: 24px 0 12px 0;
    color: #2c3e50;
  }
  
  :deep(p) {
    margin: 16px 0;
  }
  
  :deep(ul), :deep(ol) {
    margin: 16px 0;
    padding-left: 24px;
  }
  
  :deep(li) {
    margin: 8px 0;
  }
  
  :deep(a) {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 欢迎页面样式 */
.page-content :deep(.welcome-page) {
  text-align: center;
  padding: 60px 20px;
  
  h1 {
    font-size: 48px;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #3498db, #8e44ad);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 20px;
    color: #666;
  }
}

/* 关于页面样式 */
.page-content :deep(.about-page) {
  h1 {
    margin-bottom: 32px;
  }
  
  p {
    font-size: 18px;
    margin: 16px 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .html-page {
    padding: 20px;
  }
  
  .page-container {
    padding: 24px;
  }
}
</style>

