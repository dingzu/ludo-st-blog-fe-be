import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function resetDatabase() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('📦 已连接到数据库')

    // 获取所有集合
    const collections = await mongoose.connection.db.listCollections().toArray()
    
    console.log(`🗑️ 找到 ${collections.length} 个集合`)

    // 删除所有集合
    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name)
      console.log(`🗑️ 已删除集合: ${collection.name}`)
    }

    console.log('🎉 数据库重置完成')
    process.exit(0)
  } catch (error) {
    console.error('❌ 数据库重置失败:', error)
    process.exit(1)
  }
}

resetDatabase()
