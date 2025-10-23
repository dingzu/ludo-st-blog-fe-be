import mongoose from 'mongoose'

export default async function seedCategories() {
  console.log('🌱 创建默认分类...')
  
  const Category = mongoose.model('Category')
  
  // 检查是否已有分类
  const existingCategory = await Category.findOne({ slug: 'technology' })
  if (existingCategory) {
    console.log('✅ 默认分类已存在')
    return
  }

  const categories = [
    {
      name: '技术',
      slug: 'technology',
      description: '编程、开发、技术分享',
      color: '#3b82f6',
      icon: 'code',
      sortOrder: 1
    },
    {
      name: '生活',
      slug: 'life',
      description: '日常生活、个人感悟',
      color: '#10b981',
      icon: 'heart',
      sortOrder: 2
    },
    {
      name: '学习',
      slug: 'learning',
      description: '学习笔记、知识总结',
      color: '#f59e0b',
      icon: 'book',
      sortOrder: 3
    },
    {
      name: '项目',
      slug: 'projects',
      description: '项目展示、开发经验',
      color: '#8b5cf6',
      icon: 'folder',
      sortOrder: 4
    }
  ]

  for (const categoryData of categories) {
    const category = new Category(categoryData)
    await category.save()
    console.log(`✅ 分类 "${categoryData.name}" 创建完成`)
  }
}
