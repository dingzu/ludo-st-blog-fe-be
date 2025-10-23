import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    // 检查环境变量是否存在
    const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/ludost-blog'
    
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️  警告: DATABASE_URL 环境变量未设置，使用默认值:', databaseUrl)
      console.warn('💡 提示: 请创建 .env 文件并设置 DATABASE_URL=mongodb://localhost:27017/ludost-blog')
    }
    
    const conn = await mongoose.connect(databaseUrl)
    console.log(`📦 MongoDB连接成功: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB连接失败:', error)
    console.error('💡 请确保:')
    console.error('   1. MongoDB服务正在运行')
    console.error('   2. 数据库连接字符串正确')
    console.error('   3. 网络连接正常')
    process.exit(1)
  }
}

// 连接事件监听
mongoose.connection.on('connected', () => {
  console.log('📦 Mongoose连接到MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose连接错误:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('📦 Mongoose断开连接')
})

// 优雅关闭
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('📦 MongoDB连接已关闭')
  process.exit(0)
})
