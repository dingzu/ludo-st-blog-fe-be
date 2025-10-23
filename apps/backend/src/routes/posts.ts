import { Router } from 'express'

const router = Router()

// 获取所有文章
router.get('/', (req, res) => {
  res.json({
    message: '获取文章列表',
    data: []
  })
})

// 获取单个文章
router.get('/:id', (req, res) => {
  res.json({
    message: '获取文章详情',
    data: { id: req.params.id }
  })
})

// 创建文章
router.post('/', (req, res) => {
  res.json({
    message: '创建文章',
    data: req.body
  })
})

// 更新文章
router.put('/:id', (req, res) => {
  res.json({
    message: '更新文章',
    data: { id: req.params.id, ...req.body }
  })
})

// 删除文章
router.delete('/:id', (req, res) => {
  res.json({
    message: '删除文章',
    data: { id: req.params.id }
  })
})

export default router
