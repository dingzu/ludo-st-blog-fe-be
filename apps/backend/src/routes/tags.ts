import { Router } from 'express'

const router = Router()

// 获取所有标签
router.get('/', (req, res) => {
  res.json({
    message: '获取标签列表',
    data: []
  })
})

// 创建标签
router.post('/', (req, res) => {
  res.json({
    message: '创建标签',
    data: req.body
  })
})

export default router
