// 用户相关类型
export interface User {
  _id: string
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  bio?: string
  website?: string
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  username: string
  email: string
  password: string
  bio?: string
  website?: string
}

export interface UpdateUserData {
  username?: string
  email?: string
  bio?: string
  website?: string
  avatar?: string
}

// 文章相关类型
export interface Post {
  _id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  cover?: string
  status: 'draft' | 'published' | 'archived'
  authorId: string
  categoryId?: string
  tags: string[]
  viewCount: number
  likeCount: number
  commentCount: number
  isFeatured: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  cover?: string
  status?: 'draft' | 'published'
  categoryId?: string
  tags?: string[]
  isFeatured?: boolean
}

export interface UpdatePostData {
  title?: string
  content?: string
  excerpt?: string
  cover?: string
  status?: 'draft' | 'published' | 'archived'
  categoryId?: string
  tags?: string[]
  isFeatured?: boolean
}

// 分类相关类型
export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateCategoryData {
  name: string
  description?: string
  color?: string
}

// 标签相关类型
export interface Tag {
  _id: string
  name: string
  slug: string
  color?: string
  postCount: number
  createdAt: Date
}

export interface CreateTagData {
  name: string
  color?: string
}

// 评论相关类型
export interface Comment {
  _id: string
  postId: string
  parentId?: string
  author: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

export interface CreateCommentData {
  postId: string
  parentId?: string
  author: string
  email: string
  content: string
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// 分页参数
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

// 搜索参数
export interface SearchParams extends PaginationParams {
  q?: string
  category?: string
  tag?: string
  status?: string
  author?: string
}

// 认证相关类型
export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

// 文件上传类型
export interface UploadResponse {
  url: string
  filename: string
  size: number
  mimetype: string
}
