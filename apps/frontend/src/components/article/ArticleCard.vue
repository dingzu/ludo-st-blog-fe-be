<template>
  <div class="article-card" @click="handleClick">
    <div class="card-image">
      <img :src="article.coverImage" :alt="article.title" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-summary">{{ article.summary }}</p>
      <div class="card-meta">
        <span class="meta-item">
          <span class="meta-icon">👤</span>
          {{ article.author }}
        </span>
        <span class="meta-item">
          <span class="meta-icon">📅</span>
          {{ article.date }}
        </span>
      </div>
      <div class="card-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/mock/data';

interface Props {
  article: Article;
}

interface Emits {
  (e: 'click', articleId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click', props.article.id);
};
</script>

<style scoped lang="scss">
.article-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.card-content {
  padding: 20px;
}

.card-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-summary {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #999;
}

.meta-icon {
  margin-right: 4px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background-color: #e8f4f8;
  color: #3498db;
  border-radius: 12px;
  font-size: 12px;
}
</style>

