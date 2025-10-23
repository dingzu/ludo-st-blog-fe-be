import { Router } from 'express'

const router = Router()

// 获取文章评论
router.get('/:postId', (req, res) => {
  res.json({
    message: '获取文章评论',
    data: []
  })
})

// 创建评论
router.post('/', (req, res) => {
  res.json({
    message: '创建评论',
    data: req.body
  })
})

export default router
