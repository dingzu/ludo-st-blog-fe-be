<template>
  <div class="blog-home-container">
    <!-- 左栏：顶层导航 -->
    <nav class="main-nav">
      <div class="nav-header">
        <h1 class="logo">Ludost Blog</h1>
      </div>
      <ul class="nav-menu">
        <li
          v-for="item in navItems"
          :key="item.id"
          :class="{ active: currentNavId === item.id }"
          @click="selectNav(item)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </li>
      </ul>
    </nav>

    <!-- 中栏：内容区域 -->
    <main class="content-area">
      <!-- 类型1: HTML页面 -->
      <div v-if="currentContent && currentContent.type === 'html'" class="html-content">
        <div class="content-header">
          <h2>{{ currentContent.title }}</h2>
        </div>
        <div v-html="currentContent.html" class="content-body"></div>
      </div>

      <!-- 类型2: 文档列表 -->
      <div v-else-if="currentContent && currentContent.type === 'document'" class="document-layout">
        <div class="sub-nav-area">
          <SubNavigation 
            :groups="currentContent.groups || []"
            :active-group="activeGroup"
            @select-group="handleGroupSelect"
          />
        </div>
        <div class="articles-area" ref="articlesAreaRef">
          <ArticleCardList 
            :articles="filteredArticles"
            :has-sub-nav="currentContent && currentContent.type === 'document'"
            @update:expanding="handleExpandingChange"
          />
        </div>
      </div>

      <!-- 默认视图 -->
      <div v-else class="welcome-view">
        <h1>欢迎来到 Ludost Blog</h1>
        <p>请从左侧导航选择一个分类</p>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SubNavigation from '@/components/blog/SubNavigation.vue'
import ArticleCardList from '@/components/blog/ArticleCardList.vue'
import { getMockNavItems, getMockContent, getMockArticles, type NavItem, type ContentData, type Article } from '@/services/blogService'

const router = useRouter()
const route = useRoute()

const currentNavId = ref<string | null>(null)
const currentContent = ref<ContentData | null>(null)
const activeGroup = ref<string | null>(null)
const articlesAreaRef = ref<HTMLElement | null>(null)

const handleExpandingChange = (isExpanding: boolean) => {
  if (articlesAreaRef.value) {
    if (isExpanding) {
      // 展开时禁用滚动
      articlesAreaRef.value.style.overflow = 'hidden'
    } else {
      // 收起时恢复滚动
      articlesAreaRef.value.style.overflow = 'auto'
    }
  }
}

const navItems = ref<NavItem[]>(getMockNavItems())

const filteredArticles = computed(() => {
  if (!currentContent.value || currentContent.value.type !== 'document') {
    return []
  }
  
  const allArticles = getMockArticles()
  
  if (!activeGroup.value) {
    return allArticles
  }
  
  return allArticles.filter(article => article.group === activeGroup.value)
})

const selectNav = (item: NavItem) => {
  currentNavId.value = item.id
  const content = getMockContent(item.id)
  currentContent.value = content
  
  // 如果是文档类型，设置默认组
  if (content && content.type === 'document' && content.groups && content.groups.length > 0) {
    const groupId = activeGroup.value || content.groups[0].id
    activeGroup.value = groupId
  } else {
    activeGroup.value = null
  }
  
  // 更新 URL
  const query = { nav: item.id }
  if (activeGroup.value) {
    query.group = activeGroup.value
  }
  router.push({ path: route.path, query })
}

const handleGroupSelect = (groupId: string) => {
  activeGroup.value = groupId
  
  // 更新 URL，移除 article 参数（如果存在）
  const query = { ...route.query, group: groupId }
  delete query.article
  router.push({ path: route.path, query })
}

// 从 URL 恢复导航状态
onMounted(() => {
  const { nav, group } = route.query
  
  if (nav) {
    // 恢复一级导航
    const navItem = getMockNavItems().find(item => item.id === nav as string)
    if (navItem) {
      currentNavId.value = navItem.id
      const content = getMockContent(navItem.id)
      currentContent.value = content
      
      // 恢复二级导航
      if (group && content && content.type === 'document' && content.groups) {
        const groupExists = content.groups.some(g => g.id === group as string)
        if (groupExists) {
          activeGroup.value = group as string
        } else {
          activeGroup.value = content.groups[0]?.id || null
        }
      } else if (content && content.type === 'document' && content.groups) {
        activeGroup.value = content.groups[0]?.id || null
      }
    }
  }
})

// 监听路由变化
watch(() => route.query, (newQuery, oldQuery) => {
  const { nav, group } = newQuery
  
  // 如果 group 变化了且存在 article 参数，移除 article
  if (oldQuery && group !== oldQuery?.group && newQuery.article) {
    const query = { ...newQuery }
    delete query.article
    router.replace({ path: route.path, query })
    return
  }
  
  if (nav) {
    const navItem = getMockNavItems().find(item => item.id === nav as string)
    if (navItem) {
      currentNavId.value = navItem.id
      const content = getMockContent(navItem.id)
      currentContent.value = content
      
      if (group && content && content.type === 'document' && content.groups) {
        activeGroup.value = group as string
      } else if (content && content.type === 'document' && content.groups) {
        activeGroup.value = content.groups[0]?.id || null
      }
    }
  }
})
</script>

<style scoped lang="scss">
.blog-home-container {
  display: flex;
  height: 100vh;
  background: var(--bg-secondary);
  overflow: hidden;
}

.main-nav {
  width: 260px;
  background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  
  .nav-header {
    padding: 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .logo {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(90deg, #fff, #e0e0e0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .nav-menu {
    list-style: none;
    padding: 20px 0;
    margin: 0;
    
    li {
      cursor: pointer;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-left-color: #64b5f6;
      }
      
      &.active {
        background: rgba(255, 255, 255, 0.1);
        border-left-color: #42a5f5;
        
        .nav-label {
          font-weight: 600;
        }
      }
      
      .nav-icon {
        font-size: 20px;
      }
      
      .nav-label {
        font-size: 15px;
      }
    }
  }
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
  
  .html-content {
    padding: 40px;
    
    .content-header {
      margin-bottom: 30px;
      
      h2 {
        font-size: 32px;
        color: #1e3c72;
        border-bottom: 3px solid #42a5f5;
        padding-bottom: 10px;
      }
    }
    
    .content-body {
      line-height: 1.8;
      
      :deep(h3) {
        color: #2a5298;
        margin-top: 30px;
      }
    }
  }
  
  .document-layout {
    display: flex;
    height: 100%;
  }
  
  
  .welcome-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    
    h1 {
      font-size: 48px;
      color: #1e3c72;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 18px;
      color: #757575;
    }
  }
}

  .sub-nav-area {
    width: 240px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
}

.articles-area {
  flex: 1;
  overflow-y: auto;
}

// 滚动条样式
.content-area::-webkit-scrollbar,
.sub-nav-area::-webkit-scrollbar {
  width: 8px;
}

.content-area::-webkit-scrollbar-track,
.sub-nav-area::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.content-area::-webkit-scrollbar-thumb,
.sub-nav-area::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb:hover,
.sub-nav-area::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

// 响应式设计
@media (max-width: 768px) {
  .blog-home-container {
    flex-direction: column;
  }
  
  .main-nav {
    width: 100%;
    height: auto;
    
    .nav-header {
      padding: 16px;
    }
    
    .nav-menu {
      display: flex;
      overflow-x: auto;
      padding: 10px;
      
      li {
        flex-shrink: 0;
        border-left: none;
        border-bottom: 3px solid transparent;
        padding: 12px 16px;
        
        &.active {
          border-left: none;
          border-bottom-color: #42a5f5;
        }
      }
    }
  }
  
  .document-layout {
    flex-direction: column;
  }
  
  .sub-nav-area {
    width: 100%;
    max-height: 200px;
    overflow-x: auto;
    white-space: nowrap;
    
    .sub-nav-list {
      display: flex;
      padding: 0 10px;
      
      li {
        white-space: nowrap;
        border-left: none;
        border-bottom: 3px solid transparent;
        
        &.active {
          border-left: none;
          border-bottom-color: #42a5f5;
        }
      }
    }
  }
  
  .articles-area {
    padding: 20px;
  }
  
  .article-card-list {
    grid-template-columns: 1fr;
  }
}
</style>
