<template>
  <div class="article-list">
    <div v-if="title" class="list-header">
      <h2 class="list-title">{{ title }}</h2>
      <p v-if="description" class="list-description">{{ description }}</p>
    </div>
    
    <div class="cards-grid">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @click="handleArticleClick"
      />
    </div>
    
    <div v-if="articles.length === 0" class="empty-state">
      <p>暂无文章</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from './ArticleCard.vue';
import type { Article } from '@/mock/data';

interface Props {
  articles: Article[];
  title?: string;
  description?: string;
}

interface Emits {
  (e: 'article-click', articleId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleArticleClick = (articleId: string) => {
  emit('article-click', articleId);
};
</script>

<style scoped lang="scss">
.article-list {
  padding: 32px;
}

.list-header {
  margin-bottom: 32px;
}

.list-title {
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
}

.list-description {
  margin: 0;
  font-size: 16px;
  color: #666;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-list {
    padding: 20px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>

