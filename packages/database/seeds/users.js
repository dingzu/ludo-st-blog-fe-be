import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export default async function seedUsers() {
  console.log('🌱 创建默认用户...')
  
  const User = mongoose.model('User')
  
  // 检查是否已有用户
  const existingUser = await User.findOne({ email: 'admin@ludost.com' })
  if (existingUser) {
    console.log('✅ 默认用户已存在')
    return
  }

  // 创建管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = new User({
    username: 'admin',
    email: 'admin@ludost.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true
  })

  await adminUser.save()
  console.log('✅ 管理员用户创建完成')

  // 创建测试用户
  const testUserPassword = await bcrypt.hash('test123', 10)
  
  const testUser = new User({
    username: 'testuser',
    email: 'test@ludost.com',
    password: testUserPassword,
    role: 'user',
    isActive: true
  })

  await testUser.save()
  console.log('✅ 测试用户创建完成')
}
