<template>
  <div class="article-card" @click="$emit('click', $event)">
    <div class="card-header">
      <div class="card-meta">
        <span class="meta-item">{{ article.category }}</span>
        <span class="meta-divider">•</span>
        <span class="meta-item">{{ article.date }}</span>
      </div>
      <h3 class="card-title">{{ article.title }}</h3>
      <div class="card-tags">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="tag"
        >{{ tag }}</span>
      </div>
    </div>
    <div class="card-image">
      <img :src="article.image" :alt="article.title" />
    </div>
    <p class="card-excerpt">{{ article.excerpt }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  article: {
    id: string
    title: string
    excerpt: string
    image: string
    category: string
    date: string
    tags: string[]
  }
  index: number
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
.article-card {
  background: var(--bg-primary);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 4px 12px var(--shadow);
  }
  
  .card-header {
    padding: 24px 24px 16px;
    
    .card-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 13px;
      color: var(--text-secondary);
      
      .meta-divider {
        opacity: 0.5;
      }
    }
    
    .card-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--primary);
      margin: 0 0 12px 0;
      line-height: 1.3;
      transition: color 0.3s ease;
    }
    
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .tag {
        font-size: 12px;
        padding: 4px 12px;
        background: var(--bg-hover);
        color: var(--primary);
        border-radius: 12px;
        font-weight: 500;
        transition: all 0.3s ease;
      }
    }
  }
  
  .card-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  
  &:hover .card-image img {
    transform: scale(1.02);
  }
  
  .card-excerpt {
    padding: 16px 24px 24px;
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 3;
  }
}
</style>
