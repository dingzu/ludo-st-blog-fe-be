import mongoose from 'mongoose'

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
  cover: { 
    type: String,
    default: ''
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  authorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category' 
  },
  tags: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tag' 
  }],
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
  isFeatured: {
    type: Boolean,
    default: false
  },
  publishedAt: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
})

// 索引
postSchema.index({ slug: 1 })
postSchema.index({ status: 1 })
postSchema.index({ authorId: 1 })
postSchema.index({ categoryId: 1 })
postSchema.index({ publishedAt: -1 })
postSchema.index({ createdAt: -1 })
postSchema.index({ viewCount: -1 })
postSchema.index({ likeCount: -1 })

// 文本搜索索引
postSchema.index({ 
  title: 'text', 
  content: 'text', 
  excerpt: 'text' 
})

// 中间件
postSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  
  // 如果状态改为published且没有publishedAt，设置发布时间
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  
  next()
})

// 虚拟字段
postSchema.virtual('author', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true
})

postSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true
})

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId'
})

// 方法
postSchema.methods.incrementViewCount = function() {
  this.viewCount += 1
  return this.save()
}

postSchema.methods.incrementLikeCount = function() {
  this.likeCount += 1
  return this.save()
}

export const Post = mongoose.model('Post', postSchema)
