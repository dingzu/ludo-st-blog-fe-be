import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// 导入路由
import indexRoutes from './routes/index.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import categoryRoutes from './routes/categories.js'
import tagRoutes from './routes/tags.js'
import commentRoutes from './routes/comments.js'
import uploadRoutes from './routes/upload.js'
import navItemsRoutes from './routes/navItems.js'

// 导入中间件
import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './config/database.js'

// 加载环境变量
dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// 连接数据库
connectDB()

// 安全中间件
app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    // 允许没有origin的请求（如移动应用、Postman）
    if (!origin) {
      return callback(null, true)
    }
    
    // 允许的域名列表
    const allowedOrigins = [
      // 自定义域名
      'https://blog.ludost.cn',
      'https://ludost.cn',
      // Vercel 生产域名
      'https://ludo-st-blog-fe-be-frontend.vercel.app',
      'https://ludost-blog-frontend.vercel.app',
      // 开发环境
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
      'http://127.0.0.1:3003'
    ]
    
    // 如果是生产环境，允许所有 .vercel.app 和 .ludost.cn 子域名
    if (process.env.NODE_ENV === 'production') {
      if (origin.includes('.vercel.app') || origin.includes('.ludost.cn')) {
        return callback(null, true)
      }
    }
    
    // 检查是否在允许列表中
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('CORS策略不允许该来源'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Range', 'X-Total-Count']
}))

// 限流中间件
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: '请求过于频繁，请稍后再试'
})
app.use('/api/', limiter)

// 基础中间件
app.use(compression())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 静态文件服务
app.use('/uploads', express.static('uploads'))

// API路由
app.use('/api', indexRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/nav-items', navItemsRoutes)

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ message: '接口不存在' })
})

// 错误处理中间件
app.use(errorHandler)

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`)
  console.log(`📝 API文档: http://localhost:${PORT}/api-docs`)
  console.log(`🏥 健康检查: http://localhost:${PORT}/health`)
})

export default app
