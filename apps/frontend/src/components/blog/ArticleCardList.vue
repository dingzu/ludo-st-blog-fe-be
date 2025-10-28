<template>
  <div class="article-card-list-wrapper" ref="wrapperRef">
    <!-- 原始卡片列表 -->
    <div 
      class="article-card-list"
      :class="{ 'expanding': isExpanding }"
    >
      <div
        v-for="(article, index) in articles"
        :key="`original-${article.id}`"
        class="article-card-item"
        :class="{
          'clicked': clickedIndex === index,
          'above': isExpanding && clickedIndex !== null && index < clickedIndex,
          'below': isExpanding && clickedIndex !== null && index > clickedIndex
        }"
      >
        <ArticleCard 
          :article="article"
          :index="index"
          @click="handleCardClick(article, index, $event)"
        />
      </div>
      
      <div v-if="articles.length === 0" class="empty-state">
        <p>暂无文章</p>
      </div>
    </div>

    <!-- 虚拟容器 - 用于展开动画 -->
    <Transition name="virtual-container">
        <div
          v-if="expandedArticle && originRect"
          ref="virtualContainerRef"
          class="virtual-container"
          :style="{ '--virtual-container-left': virtualContainerLeft }"
        >
         <!-- 复制卡片层 -->
         <Transition
           name="cloned-card"
           @enter="onExpandEnter"
         >
        <div
          v-if="expandedArticle"
          ref="clonedCardRef"
          class="cloned-card"
          :style="{
            '--card-top': `${originRect.top}px`,
            '--card-left': `${originRect.left}px`,
            '--card-height': `${originRect.height}px`,
            '--card-original-top': `${originRect.top}px`
          }"
        >
            <button class="close-btn" @click="closeArticle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            
            <div class="article-header">
              <div class="article-meta">
                <span class="meta-category">{{ expandedArticle.category }}</span>
                <span class="meta-divider">•</span>
                <span class="meta-date">{{ expandedArticle.date }}</span>
              </div>
              <h3 class="article-title">{{ expandedArticle.title }}</h3>
              <div class="article-tags">
                <span
                  v-for="tag in expandedArticle.tags"
                  :key="tag"
                  class="tag"
                >{{ tag }}</span>
              </div>
            </div>

            <div class="article-hero">
              <img :src="expandedArticle.image" :alt="expandedArticle.title" />
            </div>
            
            <div class="article-body">
              <div class="article-excerpt">
                {{ expandedArticle.excerpt }}
              </div>
              <div class="article-content">
                <p v-for="(para, index) in expandedArticle.content?.split('\n\n')" :key="index">
                  {{ para }}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ArticleCard from './ArticleCard.vue'

export interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  tags: string[]
  group: string
  content?: string
}

const props = defineProps<{
  articles: Article[]
  hasSubNav?: boolean // 是否有二级导航
}>()

const emit = defineEmits<{
  'update:expanding': [value: boolean]
}>()

const router = useRouter()
const route = useRoute()

// 解构 props 以在模板和脚本中使用（保持响应式）
const { articles, hasSubNav } = toRefs(props)

// 从 URL 自动展开文章的函数
const expandFromUrl = async () => {
  const articleId = route.query.article
  if (!articleId || articles.value.length === 0 || expandedArticle.value) {
    return
  }
  
  const article = articles.value.find(a => a.id === articleId.toString())
  if (!article) {
    console.log('Article not found:', articleId)
    return
  }
  
  const index = articles.value.findIndex(a => a.id === articleId.toString())
  if (index === -1) {
    console.log('Article index not found:', articleId)
    return
  }
  
  console.log('Expanding article from URL:', articleId, 'index:', index)
  
  // 等待 DOM 渲染完成
  await nextTick()
  
  // 找到对应的卡片元素
  const cardItems = wrapperRef.value?.querySelectorAll('.article-card-item')
  if (!cardItems || cardItems.length === 0) {
    console.log('No card items found')
    return
  }
  
  const targetCard = cardItems[index] as HTMLElement
  if (!targetCard) {
    console.log('Target card not found at index:', index)
    return
  }
  
  const cardRect = targetCard.getBoundingClientRect()
  const wrapperRect = wrapperRef.value!.getBoundingClientRect()
  
  originRect.value = new DOMRect(
    cardRect.left - wrapperRect.left + wrapperRef.value!.scrollLeft,
    cardRect.top - wrapperRect.top + wrapperRef.value!.scrollTop,
    cardRect.width,
    cardRect.height
  )
  
  clickedIndex.value = index
  isExpanding.value = true
  emit('update:expanding', true)
  
  await nextTick()
  expandedArticle.value = article
  console.log('Article expanded successfully')
}

// 监听 URL 变化
watch(() => route.query.article, async (articleId) => {
  if (!articleId && expandedArticle.value) {
    closeArticle()
    return
  }
  
  if (articleId && articles.value.length > 0 && !expandedArticle.value) {
    await expandFromUrl()
  }
})

// 监听 articles 变化，当 articles 准备好后尝试展开
watch(articles, async (newArticles) => {
  if (newArticles.length > 0 && route.query.article && !expandedArticle.value) {
    await nextTick()
    await expandFromUrl()
  }
}, { immediate: true })

// 组件挂载时尝试从 URL 展开文章
onMounted(async () => {
  // 延迟一下确保 DOM 渲染完成
  await nextTick()
  await expandFromUrl()
})

// 计算虚拟容器的左边距
const virtualContainerLeft = computed(() => {
  // 左侧导航: 260px
  // 二级导航: 240px
  // 如果只有左侧导航，虚拟容器从 260px 开始
  return hasSubNav.value ? '500px' : '260px'
})

const wrapperRef = ref<HTMLElement | null>(null)
const virtualContainerRef = ref<HTMLElement | null>(null)
const clonedCardRef = ref<HTMLElement | null>(null)
const expandedArticle = ref<Article | null>(null)
const isExpanding = ref(false)
const clickedIndex = ref<number | null>(null)
const originRect = ref<DOMRect | null>(null)

const handleCardClick = async (article: Article, index: number, event: MouseEvent) => {
  console.log('=== handleCardClick START ===')
  console.log('article:', article)
  console.log('index:', index)
  
  const cardElement = (event.currentTarget as HTMLElement).closest('.article-card-item')
  if (!cardElement || !wrapperRef.value) {
    console.log('ERROR: cardElement or wrapperRef is null')
    return
  }
  
  // 记录原始位置（相对于父容器）
  const cardRect = cardElement.getBoundingClientRect()
  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  
  originRect.value = new DOMRect(
    cardRect.left - wrapperRect.left + wrapperRef.value.scrollLeft,
    cardRect.top - wrapperRect.top + wrapperRef.value.scrollTop,
    cardRect.width,
    cardRect.height
  )
  
  console.log('originRect:', originRect.value)
  
  clickedIndex.value = index
  
  // 开始展开动画
  isExpanding.value = true
  emit('update:expanding', true)
  
  console.log('isExpanding set to true, awaiting nextTick...')
  await nextTick()
  
  console.log('nextTick done, setting expandedArticle...')
  // 设置展开的文章
  expandedArticle.value = article
  console.log('expandedArticle set:', expandedArticle.value)
  console.log('=== handleCardClick END ===')
  
  // 更新 URL（使用 replace 避免重复历史记录）
  router.replace({ 
    path: route.path, 
    query: { ...route.query, article: article.id },
    hash: `#${article.id}`
  })
}

const closeArticle = () => {
  console.log('=== closeArticle called ===')
  expandedArticle.value = null
  isExpanding.value = false
  clickedIndex.value = null
  originRect.value = null
  emit('update:expanding', false)
  
  // 恢复 URL（使用 replace 避免重复历史记录）
  const query = { ...route.query }
  delete query.article
  router.replace({ 
    path: route.path, 
    query,
    hash: ''
  })
}

const onExpandEnter = (el: Element) => {
  console.log('=== onExpandEnter called ===')
  console.log('el:', el)
  console.log('virtualContainerRef.value:', virtualContainerRef.value)
  console.log('clonedCardRef.value:', clonedCardRef.value)
  
  // 确保虚拟容器能接收滚动事件
  if (virtualContainerRef.value) {
    virtualContainerRef.value.scrollTop = 0
    
    // 给一点延迟，让动画从顶部开始
    requestAnimationFrame(() => {
      if (virtualContainerRef.value) {
        virtualContainerRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      
      // 立即开始移动到0的动画
      setTimeout(() => {
        console.log('=== setTimeout callback (0ms) ===')
        console.log('clonedCardRef.value:', clonedCardRef.value)
        if (clonedCardRef.value) {
          // 先添加过渡
          clonedCardRef.value.style.transition = 'transform 0.3s ease-out'
          clonedCardRef.value.style.minHeight = 'auto'
          
          // 下一帧再应用 transform，这样可以触发过渡
          requestAnimationFrame(() => {
            if (clonedCardRef.value) {
              clonedCardRef.value.style.transform = 'translateY(30px) translateX(-50%)'
              console.log('Styles applied successfully with transition')
            }
          })
        } else {
          console.log('ERROR: clonedCardRef.value is null')
        }
      }, 0) // 立即执行
    })
  } else {
    console.log('ERROR: virtualContainerRef.value is null')
  }
}

// 监听 expandedArticle 变化
watch(expandedArticle, (newVal) => {
  console.log('=== watch expandedArticle ===')
  console.log('newVal:', newVal)
  if (newVal) {
    nextTick(() => {
      console.log('nextTick in watch')
      console.log('clonedCardRef.value:', clonedCardRef.value)
      // 立即开始移动到0的动画
      setTimeout(() => {
        console.log('=== setTimeout callback (0ms) ===')
        console.log('clonedCardRef.value:', clonedCardRef.value)
        if (clonedCardRef.value) {
          // 先添加过渡
          clonedCardRef.value.style.transition = 'transform 0.3s ease-out'
          clonedCardRef.value.style.minHeight = 'auto'
          
          // 下一帧再应用 transform，这样可以触发过渡
          requestAnimationFrame(() => {
            if (clonedCardRef.value) {
              clonedCardRef.value.style.transform = 'translateY(30px) translateX(-50%)'
              console.log('Styles applied successfully with transition')
            }
          })
        } else {
          console.log('ERROR: clonedCardRef.value is null')
        }
      }, 0) // 立即执行
    })
  }
})
</script>

<style scoped lang="scss">
.article-card-list-wrapper {
  position: relative;
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  min-height: 100%;
  padding: 30px;
}

.article-card-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0;
  
  &.expanding {
    .article-card-item {
      &.clicked {
        opacity: 0;
        pointer-events: none;
      }
      
        &.above {
          animation: slideUpOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        &.below {
          animation: slideDownOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
    }
  }
}

.article-card-item {
  position: relative;
}

@keyframes slideUpOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-60px);
    opacity: 0;
  }
}

@keyframes slideDownOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(60px);
    opacity: 0;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9e9e9e;
  font-size: 16px;
}

// 虚拟容器层
.virtual-container {
  position: fixed;
  top: 0;
  left: var(--virtual-container-left);
  right: 0;
  bottom: 0;
  z-index: 999;
  overflow-y: scroll;
  
  // 始终显示滚动条，避免宽度跳变
  scrollbar-gutter: stable;
}

// 复制卡片层
.cloned-card {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateY(var(--card-top)) translateX(-50%);
  width: calc(100% - 60px);
  max-width: 960px;
  min-height: var(--card-height);
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 8px 48px var(--shadow-lg);
  overflow: visible;
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: var(--bg-overlay);
    backdrop-filter: blur(10px);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: var(--text-primary);
    z-index: 1000;
    box-shadow: 0 2px 8px var(--shadow);
    
    &:hover {
      background: var(--bg-primary);
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  .article-header {
    padding: 24px 24px 16px;
    
    .article-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 13px;
      color: var(--text-secondary);
      
      .meta-category {
        font-weight: 600;
        color: var(--primary);
      }
      
      .meta-divider {
        opacity: 0.5;
      }
    }
    
    .article-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--primary);
      margin: 0 0 12px 0;
      line-height: 1.3;
      transition: color 0.3s ease;
    }
    
    .article-tags {
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
  
  .article-hero {
    width: 100%;
    height: 300px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .article-body {
    padding: 16px 24px 24px;
    
    .article-excerpt {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0 0 40px 0;
    }
    
    .article-content {
      font-size: 16px;
      line-height: 1.8;
      color: var(--text-primary);
      
      p {
        margin-bottom: 20px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

// 复制卡片动画
.cloned-card-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.cloned-card-enter-from {
  transform: translateY(var(--card-top)) translateX(calc(var(--card-left) - 50%)) !important;
  left: 50% !important;
  min-height: var(--card-height) !important;
}

.cloned-card-enter-to {
  transform: translateY(30px) translateX(-50%) !important;
  left: 50% !important;
  min-height: calc(100vh + 30px) !important;
}

.cloned-card-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.cloned-card-leave-from {
  transform: translateY(30px) translateX(-50%) !important;
  left: 50% !important;
  min-height: calc(100vh + 30px) !important;
}

.cloned-card-leave-to {
  transform: translateY(var(--card-top)) translateX(calc(var(--card-left) - 50%)) !important;
  left: 50% !important;
  min-height: var(--card-height) !important;
}
</style>