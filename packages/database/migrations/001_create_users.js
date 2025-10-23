import mongoose from 'mongoose'

export async function up() {
  console.log('🔄 创建用户集合...')
  
  // 创建用户集合
  const userSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    avatar: { 
      type: String,
      default: null
    },
    role: { 
      type: String, 
      enum: ['admin', 'user'], 
      default: 'user' 
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLoginAt: {
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
  userSchema.index({ email: 1 })
  userSchema.index({ username: 1 })
  userSchema.index({ role: 1 })
  userSchema.index({ createdAt: -1 })

  // 更新时间中间件
  userSchema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
  })

  mongoose.model('User', userSchema)
  console.log('✅ 用户集合创建完成')
}

export async function down() {
  console.log('🔄 删除用户集合...')
  await mongoose.connection.db.dropCollection('users')
  console.log('✅ 用户集合删除完成')
}
