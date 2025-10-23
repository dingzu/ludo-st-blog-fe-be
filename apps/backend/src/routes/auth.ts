import { Router } from 'express'

const router = Router()

// 用户登录
router.post('/login', (req, res) => {
  res.json({
    message: '用户登录',
    data: { token: 'mock-token' }
  })
})

// 用户注册
router.post('/register', (req, res) => {
  res.json({
    message: '用户注册',
    data: req.body
  })
})

// 获取用户信息
router.get('/me', (req, res) => {
  res.json({
    message: '获取用户信息',
    data: { id: '1', username: 'admin' }
  })
})

export default router
