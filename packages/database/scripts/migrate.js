import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const MIGRATIONS_DIR = path.join(__dirname, '../migrations')

async function runMigrations() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('📦 已连接到数据库')

    // 获取已执行的迁移
    const Migration = mongoose.model('Migration', new mongoose.Schema({
      name: String,
      executedAt: Date
    }))

    // 读取迁移文件
    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
      .filter(file => file.endsWith('.js'))
      .sort()

    console.log(`📋 找到 ${migrationFiles.length} 个迁移文件`)

    for (const file of migrationFiles) {
      const migrationName = file.replace('.js', '')
      
      // 检查是否已执行
      const executed = await Migration.findOne({ name: migrationName })
      if (executed) {
        console.log(`✅ 迁移 ${migrationName} 已执行`)
        continue
      }

      console.log(`🔄 执行迁移: ${migrationName}`)
      
      try {
        // 执行迁移
        const migration = await import(path.join(MIGRATIONS_DIR, file))
        await migration.up()
        
        // 记录执行状态
        await Migration.create({
          name: migrationName,
          executedAt: new Date()
        })
        
        console.log(`✅ 迁移 ${migrationName} 完成`)
      } catch (error) {
        console.error(`❌ 迁移 ${migrationName} 失败:`, error)
        throw error
      }
    }

    console.log('🎉 所有迁移完成')
    process.exit(0)
  } catch (error) {
    console.error('❌ 迁移失败:', error)
    process.exit(1)
  }
}

runMigrations()
