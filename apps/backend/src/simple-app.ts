import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 基础路由
app.get('/', (req, res) => {
  res.json({
    message: 'Ludost Blog API 服务运行正常',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

// API路由
app.get('/api', (req, res) => {
  res.json({
    name: 'Ludost Blog API',
    version: '1.0.0',
    description: '博客网站后端API服务',
    endpoints: {
      health: '/health',
      api: '/api',
      posts: '/api/posts',
      categories: '/api/categories',
      tags: '/api/tags',
      comments: '/api/comments',
      auth: '/api/auth'
    }
  })
})

// 模拟API路由
app.get('/api/posts', (req, res) => {
  res.json({
    message: '获取文章列表',
    data: [
      {
        id: 1,
        title: '欢迎来到Ludost Blog',
        excerpt: '这是第一篇博客文章',
        createdAt: new Date().toISOString()
      }
    ]
  })
})

app.get('/api/categories', (req, res) => {
  res.json({
    message: '获取分类列表',
    data: [
      { id: 1, name: '技术', slug: 'tech' },
      { id: 2, name: '生活', slug: 'life' }
    ]
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 后端服务运行在端口 ${PORT}`)
  console.log(`📝 API文档: http://localhost:${PORT}/api`)
  console.log(`🏥 健康检查: http://localhost:${PORT}/health`)
})

export default app
