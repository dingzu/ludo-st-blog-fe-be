import mongoose from 'mongoose'

export async function up() {
  console.log('🔄 创建文章集合...')
  
  // 创建文章集合
  const postSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    content: { 
      type: String, 
      required: true 
    },
    excerpt: { 
      type: String,
      maxlength: 500
    },
    coverImage: { 
      type: String,
      default: null
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category',
      default: null
    },
    tags: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Tag' 
    }],
    status: { 
      type: String, 
      enum: ['draft', 'published', 'archived'], 
      default: 'draft' 
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    viewCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    publishedAt: {
      type: Date,
      default: null
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
  postSchema.index({ slug: 1 })
  postSchema.index({ author: 1 })
  postSchema.index({ category: 1 })
  postSchema.index({ status: 1 })
  postSchema.index({ publishedAt: -1 })
  postSchema.index({ createdAt: -1 })
  postSchema.index({ viewCount: -1 })
  postSchema.index({ title: 'text', content: 'text', excerpt: 'text' })

  // 更新时间中间件
  postSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    
    // 如果状态变为published且publishedAt为空，设置发布时间
    if (this.status === 'published' && !this.publishedAt) {
      this.publishedAt = new Date()
    }
    
    next()
  })

  mongoose.model('Post', postSchema)
  console.log('✅ 文章集合创建完成')
}

export async function down() {
  console.log('🔄 删除文章集合...')
  await mongoose.connection.db.dropCollection('posts')
  console.log('✅ 文章集合删除完成')
}
