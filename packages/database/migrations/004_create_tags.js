import mongoose from 'mongoose'

export async function up() {
  console.log('🔄 创建标签集合...')
  
  // 创建标签集合
  const tagSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 30
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    color: { 
      type: String,
      default: '#6b7280'
    },
    postCount: {
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
  tagSchema.index({ slug: 1 })
  tagSchema.index({ postCount: -1 })

  // 更新时间中间件
  tagSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
  })

  mongoose.model('Tag', tagSchema)
  console.log('✅ 标签集合创建完成')
}

export async function down() {
  console.log('🔄 删除标签集合...')
  await mongoose.connection.db.dropCollection('tags')
  console.log('✅ 标签集合删除完成')
}
