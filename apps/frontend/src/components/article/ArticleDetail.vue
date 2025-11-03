<template>
  <div class="article-detail">
    <div v-if="article" class="article-container">
      <!-- 文章头部 -->
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-item">
            <span class="meta-icon">👤</span>
            作者：{{ article.author }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">📅</span>
            发布于：{{ article.date }}
          </span>
        </div>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- 文章封面 -->
      <div class="article-cover">
        <img :src="article.coverImage" :alt="article.title" />
      </div>

      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content"></div>
      
      <!-- 返回按钮 -->
      <div class="article-footer">
        <button @click="handleBack" class="back-button">
          ← 返回列表
        </button>
      </div>
    </div>
    
    <div v-else class="loading">
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Article } from '@/mock/data';

interface Props {
  article?: Article;
}

defineProps<Props>();
const router = useRouter();

const handleBack = () => {
  router.back();
};
</script>

<style scoped lang="scss">
.article-detail {
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
}

.article-container {
  background-color: white;
}

.article-header {
  margin-bottom: 32px;
}

.article-title {
  margin: 0 0 20px 0;
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.meta-icon {
  margin-right: 6px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 16px;
  background-color: #e8f4f8;
  color: #3498db;
  border-radius: 16px;
  font-size: 13px;
}

.article-cover {
  margin-bottom: 32px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.article-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  
  :deep(h1) {
    font-size: 28px;
    margin: 32px 0 16px 0;
    color: #2c3e50;
  }
  
  :deep(h2) {
    font-size: 24px;
    margin: 28px 0 14px 0;
    color: #2c3e50;
  }
  
  :deep(h3) {
    font-size: 20px;
    margin: 24px 0 12px 0;
    color: #2c3e50;
  }
  
  :deep(p) {
    margin: 16px 0;
  }
  
  :deep(code) {
    padding: 2px 6px;
    background-color: #f5f7fa;
    border-radius: 3px;
    font-family: monospace;
    color: #e83e8c;
  }
  
  :deep(pre) {
    padding: 16px;
    background-color: #f5f7fa;
    border-radius: 4px;
    overflow-x: auto;
    
    code {
      padding: 0;
      background-color: transparent;
      color: inherit;
    }
  }
}

.article-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.back-button {
  padding: 10px 24px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail {
    padding: 20px;
  }
  
  .article-title {
    font-size: 28px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

