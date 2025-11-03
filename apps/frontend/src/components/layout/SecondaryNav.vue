<template>
  <div class="secondary-nav">
    <div class="nav-header">
      <h3 class="section-title">文章分类</h3>
    </div>
    <nav class="nav-list">
      <div
        v-for="group in groups"
        :key="group.id"
        class="group-item"
        :class="{ active: group.id === activeGroupId }"
      >
        <div class="group-header" @click="handleGroupClick(group.id)">
          <span class="group-icon">📁</span>
          <span class="group-name">{{ group.name }}</span>
          <span class="article-count">({{ group.articles.length }})</span>
        </div>
        
        <!-- 文章列表 -->
        <transition name="slide">
          <div v-show="group.id === activeGroupId" class="article-list">
            <div
              v-for="article in group.articles"
              :key="article.id"
              class="article-item"
              :class="{ active: article.id === activeArticleId }"
              @click.stop="handleArticleClick(article.id)"
            >
              <span class="article-icon">📄</span>
              <span class="article-title">{{ article.title }}</span>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { ArticleGroup } from '@/mock/data';

interface Props {
  groups: ArticleGroup[];
  activeGroupId: string;
  activeArticleId: string;
}

interface Emits {
  (e: 'group-click', groupId: string): void;
  (e: 'article-click', articleId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleGroupClick = (groupId: string) => {
  emit('group-click', groupId);
};

const handleArticleClick = (articleId: string) => {
  emit('article-click', articleId);
};
</script>

<style scoped lang="scss">
.secondary-nav {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav-header {
  padding: 24px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.nav-list {
  flex: 1;
  padding: 16px 0;
}

.group-item {
  margin-bottom: 8px;
  
  &.active {
    .group-header {
      background-color: rgba(52, 152, 219, 0.2);
      color: white;
    }
  }
}

.group-header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
}

.group-icon {
  margin-right: 8px;
  font-size: 16px;
}

.group-name {
  flex: 1;
  font-weight: 500;
}

.article-count {
  font-size: 12px;
  opacity: 0.7;
}

.article-list {
  padding-left: 12px;
  background-color: rgba(0, 0, 0, 0.1);
}

.article-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  &.active {
    background-color: rgba(52, 152, 219, 0.3);
    color: white;
    border-left: 2px solid #3498db;
  }
}

.article-icon {
  margin-right: 8px;
  font-size: 14px;
  opacity: 0.6;
}

.article-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 过渡动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>

