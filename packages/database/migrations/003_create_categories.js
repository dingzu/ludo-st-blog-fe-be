import mongoose from 'mongoose'

export async function up() {
  console.log('🔄 创建分类集合...')
  
  // 创建分类集合
  const categorySchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 50
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    description: { 
      type: String,
      maxlength: 200
    },
    color: { 
      type: String,
      default: '#3b82f6'
    },
    icon: { 
      type: String,
      default: null
    },
    postCount: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  })

  // 创建索引
  categorySchema.index({ slug: 1 })
  categorySchema.index({ isActive: 1 })
  categorySchema.index({ sortOrder: 1 })
  categorySchema.index({ postCount: -1 })

  // 更新时间中间件
  categorySchema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
  })

  mongoose.model('Category', categorySchema)
  console.log('✅ 分类集合创建完成')
}

export async function down() {
  console.log('🔄 删除分类集合...')
  await mongoose.connection.db.dropCollection('categories')
  console.log('✅ 分类集合删除完成')
}
