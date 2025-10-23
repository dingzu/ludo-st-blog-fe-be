import mongoose from 'mongoose'

export default async function seedTags() {
  console.log('🌱 创建默认标签...')
  
  const Tag = mongoose.model('Tag')
  
  // 检查是否已有标签
  const existingTag = await Tag.findOne({ slug: 'javascript' })
  if (existingTag) {
    console.log('✅ 默认标签已存在')
    return
  }

  const tags = [
    { name: 'JavaScript', slug: 'javascript', color: '#f7df1e' },
    { name: 'Vue.js', slug: 'vuejs', color: '#4fc08d' },
    { name: 'Node.js', slug: 'nodejs', color: '#339933' },
    { name: 'TypeScript', slug: 'typescript', color: '#3178c6' },
    { name: 'MongoDB', slug: 'mongodb', color: '#47a248' },
    { name: 'CSS', slug: 'css', color: '#1572b6' },
    { name: 'HTML', slug: 'html', color: '#e34f26' },
    { name: 'Git', slug: 'git', color: '#f05032' },
    { name: 'Docker', slug: 'docker', color: '#2496ed' },
    { name: 'Linux', slug: 'linux', color: '#fcc624' },
    { name: '前端开发', slug: 'frontend', color: '#61dafb' },
    { name: '后端开发', slug: 'backend', color: '#68d391' },
    { name: '全栈开发', slug: 'fullstack', color: '#9f7aea' },
    { name: '学习笔记', slug: 'learning', color: '#f6ad55' },
    { name: '项目经验', slug: 'project', color: '#fc8181' }
  ]

  for (const tagData of tags) {
    const tag = new Tag(tagData)
    await tag.save()
    console.log(`✅ 标签 "${tagData.name}" 创建完成`)
  }
}
