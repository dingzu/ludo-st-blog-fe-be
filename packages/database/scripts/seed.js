import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const SEEDS_DIR = path.join(__dirname, '../seeds')

async function runSeeds() {
  try {
    // 连接数据库
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('📦 已连接到数据库')

    // 读取种子文件
    const seedFiles = fs.readdirSync(SEEDS_DIR)
      .filter(file => file.endsWith('.js'))
      .sort()

    console.log(`📋 找到 ${seedFiles.length} 个种子文件`)

    for (const file of seedFiles) {
      const seedName = file.replace('.js', '')
      
      console.log(`🌱 执行种子: ${seedName}`)
      
      try {
        // 执行种子
        const seed = await import(path.join(SEEDS_DIR, file))
        await seed.default()
        
        console.log(`✅ 种子 ${seedName} 完成`)
      } catch (error) {
        console.error(`❌ 种子 ${seedName} 失败:`, error)
        throw error
      }
    }

    console.log('🎉 所有种子数据完成')
    process.exit(0)
  } catch (error) {
    console.error('❌ 种子执行失败:', error)
    process.exit(1)
  }
}

runSeeds()
