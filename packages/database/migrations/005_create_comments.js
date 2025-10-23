import mongoose from 'mongoose'

export async function up() {
  console.log('🔄 创建评论集合...')
  
  // 创建评论集合
  const commentSchema = new mongoose.Schema({
    content: { 
      type: String, 
      required: true,
      maxlength: 1000
    },
    post: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Post', 
      required: true 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    parent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment',
      default: null
    },
    replies: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment' 
    }],
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: {
      type: Date,
      default: null
    },
    likeCount: {
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
  commentSchema.index({ post: 1 })
  commentSchema.index({ author: 1 })
  commentSchema.index({ parent: 1 })
  commentSchema.index({ status: 1 })
  commentSchema.index({ createdAt: -1 })

  // 更新时间中间件
  commentSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    
    // 如果内容被修改，标记为已编辑
    if (this.isModified('content') && !this.isNew) {
      this.isEdited = true
      this.editedAt = new Date()
    }
    
    next()
  })

  mongoose.model('Comment', commentSchema)
  console.log('✅ 评论集合创建完成')
}

export async function down() {
  console.log('🔄 删除评论集合...')
  await mongoose.connection.db.dropCollection('comments')
  console.log('✅ 评论集合删除完成')
}
