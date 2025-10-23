import { Router } from 'express'

const router = Router()

// 文件上传
router.post('/', (req, res) => {
  res.json({
    message: '文件上传',
    data: { url: '/uploads/mock-file.jpg' }
  })
})

export default router
