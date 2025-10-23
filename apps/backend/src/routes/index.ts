import { Router } from 'express'

const router = Router()

// 健康检查路由
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: '后端服务运行正常'
  })
})

// API信息路由
router.get('/', (req, res) => {
  res.json({
    name: 'Ludost Blog API',
    version: '1.0.0',
    description: '博客网站后端API服务',
    endpoints: {
      health: '/api/health',
      posts: '/api/posts',
      categories: '/api/categories',
      tags: '/api/tags',
      comments: '/api/comments',
      auth: '/api/auth'
    }
  })
})

export default router
