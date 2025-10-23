import { Router } from 'express'

const router: Router = Router()

// 获取所有分类
router.get('/', (req, res) => {
  res.json({
    message: '获取分类列表',
    data: []
  })
})

// 创建分类
router.post('/', (req, res) => {
  res.json({
    message: '创建分类',
    data: req.body
  })
})

export default router
