export interface NavItem {
  id: string
  label: string
  icon: string
}

export interface Group {
  id: string
  label: string
  icon: string
  count: number
}

export interface ContentData {
  id: string
  type: 'html' | 'document'
  title?: string
  html?: string
  groups?: Group[]
}

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

// 模拟导航数据
export function getMockNavItems(): NavItem[] {
  return [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'tutorials', label: '教程', icon: '📚' },
    { id: 'tech', label: '技术', icon: '💻' },
    { id: 'design', label: '设计', icon: '🎨' },
    { id: 'about', label: '关于', icon: 'ℹ️' },
  ]
}

// 模拟内容数据
export function getMockContent(id: string): ContentData | null {
  const contentMap: Record<string, ContentData> = {
    'home': {
      id: 'home',
      type: 'html',
      title: '欢迎页面',
      html: `
        <div style="text-align: center; padding: 60px 20px;">
          <h2 style="color: #1e3c72; font-size: 36px; margin-bottom: 20px;">欢迎来到 Ludost Blog</h2>
          <p style="font-size: 18px; color: #616161; line-height: 1.8;">
            这是一个现代化的博客系统，采用模块化设计<br/>
            请从左侧导航选择不同的分类查看内容
          </p>
        </div>
      `
    },
    'tutorials': {
      id: 'tutorials',
      type: 'document',
      title: '教程',
      groups: [
        { id: 'frontend', label: '前端开发', icon: '⚛️', count: 8 },
        { id: 'backend', label: '后端开发', icon: '🔧', count: 6 },
        { id: 'fullstack', label: '全栈开发', icon: '🚀', count: 4 },
      ]
    },
    'tech': {
      id: 'tech',
      type: 'document',
      title: '技术分享',
      groups: [
        { id: 'javascript', label: 'JavaScript', icon: '📜', count: 12 },
        { id: 'vue', label: 'Vue.js', icon: '🟢', count: 10 },
        { id: 'typescript', label: 'TypeScript', icon: '🔷', count: 7 },
        { id: 'node', label: 'Node.js', icon: '🟢', count: 5 },
      ]
    },
    'design': {
      id: 'design',
      type: 'document',
      title: '设计资源',
      groups: [
        { id: 'ui', label: 'UI设计', icon: '🎨', count: 6 },
        { id: 'ux', label: 'UX设计', icon: '✨', count: 4 },
        { id: 'tools', label: '设计工具', icon: '🛠️', count: 8 },
      ]
    },
    'about': {
      id: 'about',
      type: 'html',
      title: '关于我们',
      html: `
        <div style="max-width: 800px; margin: 0 auto;">
          <h2 style="color: #1e3c72; margin-bottom: 20px;">关于 Ludost Blog</h2>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #2a5298;">项目介绍</h3>
            <p style="line-height: 1.8; color: #424242;">
              Ludost Blog 是一个采用现代化技术栈构建的博客平台，致力于为用户提供优雅、
              高效的阅读和创作体验。
            </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #2a5298;">技术栈</h3>
            <ul style="line-height: 2;">
              <li>前端：Vue 3 + TypeScript + Element Plus</li>
              <li>后端：Node.js + Express + MongoDB</li>
              <li>构建工具：Vite + Turbo</li>
              <li>部署：Railway + Vercel</li>
            </ul>
          </div>
          
          <div>
            <h3 style="color: #2a5298;">功能特性</h3>
            <ul style="line-height: 2;">
              <li>✏️ 富文本编辑器</li>
              <li>📝 Markdown 支持</li>
              <li>🏷️ 标签和分类管理</li>
              <li>💬 评论系统</li>
              <li>🔐 用户认证</li>
              <li>📊 数据分析</li>
            </ul>
          </div>
        </div>
      `
    }
  }
  
  return contentMap[id] || null
}

// 模拟文章数据
export function getMockArticles(): Article[] {
  const sampleContent = `这是文章的详细内容。在这里，我们可以展示完整的文章正文。

文章内容可以包含多个段落，每个段落都会被单独渲染。这样可以让内容更加清晰易读。

这个组件使用了平滑的展开动画，当卡片被点击时，会平滑地放大并充满整个页面。关闭按钮位于右上角，点击后会平滑地收回到原来的卡片位置。

动画效果包括：
- 从原始位置平滑过渡到全屏
- 图片逐渐加载并显示
- 内容区域淡入效果
- 关闭时反向执行所有动画

这是一个完整的现代化博客文章查看体验。`

  return [
    // 前端开发
    {
      id: '1',
      title: 'Vue 3 组合式 API 完全指南',
      excerpt: '深入了解 Vue 3 的 Composition API，掌握响应式数据的核心概念和实践技巧...',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
      category: '前端开发',
      date: '2024-01-15',
      tags: ['Vue', '前端', 'JavaScript'],
      group: 'frontend',
      content: sampleContent
    },
    {
      id: '2',
      title: 'TypeScript 类型系统进阶',
      excerpt: '探索 TypeScript 的高级类型特性，包括泛型、条件类型和类型推断等...',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
      category: '前端开发',
      date: '2024-01-12',
      tags: ['TypeScript', '类型系统'],
      group: 'frontend',
      content: sampleContent
    },
    {
      id: '3',
      title: 'Modern CSS 布局实践',
      excerpt: '学习如何使用 Grid 和 Flexbox 构建现代响应式布局...',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      category: '前端开发',
      date: '2024-01-10',
      tags: ['CSS', '布局', '响应式'],
      group: 'frontend',
      content: sampleContent
    },
    // 后端开发
    {
      id: '4',
      title: 'Node.js 性能优化最佳实践',
      excerpt: '提升 Node.js 应用性能的关键技巧和工具使用...',
      image: 'https://images.unsplash.com/photo-1558494949-ef66419ffb93?w=800&h=600&fit=crop',
      category: '后端开发',
      date: '2024-01-08',
      tags: ['Node.js', '性能优化'],
      group: 'backend',
      content: sampleContent
    },
    {
      id: '5',
      title: 'RESTful API 设计规范',
      excerpt: '遵循 RESTful 设计原则，构建易于使用和维护的 API...',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      category: '后端开发',
      date: '2024-01-05',
      tags: ['API', 'REST', '后端'],
      group: 'backend',
      content: sampleContent
    },
    // JavaScript
    {
      id: '6',
      title: '深入理解 JavaScript 异步编程',
      excerpt: '从回调到 Promise 再到 async/await，掌握异步编程的演变...',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
      category: '技术分享',
      date: '2024-01-20',
      tags: ['JavaScript', '异步编程'],
      group: 'javascript',
      content: sampleContent
    },
    {
      id: '7',
      title: 'ES6+ 新特性完全解析',
      excerpt: '探索现代 JavaScript 的最新特性，提升你的开发效率...',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop',
      category: '技术分享',
      date: '2024-01-18',
      tags: ['ES6', 'JavaScript'],
      group: 'javascript',
      content: sampleContent
    },
    // Vue.js
    {
      id: '8',
      title: 'Vue 3 响应式原理剖析',
      excerpt: '深入了解 Vue 3 的响应式系统，理解 Proxy 和 Ref 的工作原理...',
      image: 'https://images.unsplash.com/photo-1555066931-bb19df4e0c1d?w=800&h=600&fit=crop',
      category: '技术分享',
      date: '2024-01-22',
      tags: ['Vue', '响应式'],
      group: 'vue',
      content: sampleContent
    },
    {
      id: '9',
      title: 'Vue 3 + TypeScript 最佳实践',
      excerpt: '学习如何在 Vue 3 项目中正确使用 TypeScript，提升代码质量...',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      category: '技术分享',
      date: '2024-01-25',
      tags: ['Vue', 'TypeScript', '最佳实践'],
      group: 'vue',
      content: sampleContent
    },
    // 设计
    {
      id: '10',
      title: '现代 UI 设计趋势 2024',
      excerpt: '探索 2024 年最新的 UI 设计趋势和流行元素...',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      category: 'UI设计',
      date: '2024-01-28',
      tags: ['UI', '设计趋势'],
      group: 'ui',
      content: sampleContent
    },
    {
      id: '11',
      title: '用户体验设计原则',
      excerpt: '掌握核心的 UX 设计原则，创建更好的用户体验...',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
      category: 'UX设计',
      date: '2024-01-26',
      tags: ['UX', '用户体验'],
      group: 'ux',
      content: sampleContent
    },
  ]
}
