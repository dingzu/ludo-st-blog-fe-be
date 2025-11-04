import { Router, Request, Response } from 'express'

const router: Router = Router()

// Mock 导航数据
const mockNavItems = [
  {
    id: 'nav-1',
    name: '首页',
    type: 'html',
    path: '/home',
    icon: '🏠',
    htmlContent: '<div class="welcome-page"><h1>欢迎来到我的博客</h1><p>这是一个模块化的博客系统</p></div>'
  },
  {
    id: 'nav-2',
    name: '技术文档',
    type: 'document',
    path: '/tech',
    icon: '💻',
    groups: [
      {
        id: 'group-tech-1',
        name: 'Vue开发',
        description: 'Vue.js相关技术文章',
        articles: [
          {
            id: 'article-1',
            title: 'Vue 3 组合式API完全指南',
            summary: '深入了解Vue 3的Composition API，掌握现代Vue开发技巧。',
            coverImage: 'https://picsum.photos/seed/vue1/400/250',
            content: '<h1>Vue 3 组合式API完全指南</h1><p>Vue 3引入了组合式API...</p>',
            author: '张三',
            date: '2024-01-15',
            tags: ['Vue', 'JavaScript', '前端开发']
          }
        ]
      }
    ]
  },
  {
    id: 'nav-3',
    name: '关于',
    type: 'html',
    path: '/about',
    icon: '👤',
    htmlContent: '<div class="about-page"><h1>关于我</h1><p>全栈开发工程师</p></div>'
  }
]

// 获取所有导航项
router.get('/', (req: Request, res: Response) => {
  res.json(mockNavItems)
})

// 根据ID获取导航项
router.get('/:id', (req: Request, res: Response): void => {
  const { id } = req.params
  const navItem = mockNavItems.find(item => item.id === id)
  
  if (!navItem) {
    res.status(404).json({ message: '导航项不存在' })
    return
  }
  
  res.json(navItem)
})

export default router

