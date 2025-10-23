// 常量定义

// API状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
} as const

// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const

// 文章状态
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
} as const

// 评论状态
export const COMMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const

// 分页默认值
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
} as const

// 文件上传限制
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword']
} as const

// 验证规则
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 50
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  POST_TITLE: {
    MAX_LENGTH: 200
  },
  POST_EXCERPT: {
    MAX_LENGTH: 500
  },
  BIO: {
    MAX_LENGTH: 500
  }
} as const

// 缓存键
export const CACHE_KEYS = {
  POSTS: 'posts',
  CATEGORIES: 'categories',
  TAGS: 'tags',
  USER: 'user',
  STATS: 'stats'
} as const

// 缓存过期时间 (秒)
export const CACHE_TTL = {
  POSTS: 300, // 5分钟
  CATEGORIES: 1800, // 30分钟
  TAGS: 1800, // 30分钟
  USER: 600, // 10分钟
  STATS: 3600 // 1小时
} as const

// 排序选项
export const SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  PUBLISHED_AT: 'publishedAt',
  VIEW_COUNT: 'viewCount',
  LIKE_COUNT: 'likeCount',
  TITLE: 'title'
} as const

// 排序方向
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc'
} as const

// 错误消息
export const ERROR_MESSAGES = {
  USER_NOT_FOUND: '用户不存在',
  POST_NOT_FOUND: '文章不存在',
  CATEGORY_NOT_FOUND: '分类不存在',
  TAG_NOT_FOUND: '标签不存在',
  COMMENT_NOT_FOUND: '评论不存在',
  INVALID_CREDENTIALS: '用户名或密码错误',
  EMAIL_ALREADY_EXISTS: '邮箱已被使用',
  USERNAME_ALREADY_EXISTS: '用户名已被使用',
  UNAUTHORIZED: '未授权访问',
  FORBIDDEN: '禁止访问',
  VALIDATION_ERROR: '数据验证失败',
  INTERNAL_ERROR: '服务器内部错误'
} as const

// 成功消息
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  REGISTER_SUCCESS: '注册成功',
  POST_CREATED: '文章创建成功',
  POST_UPDATED: '文章更新成功',
  POST_DELETED: '文章删除成功',
  COMMENT_CREATED: '评论提交成功',
  COMMENT_APPROVED: '评论审核通过',
  COMMENT_REJECTED: '评论已拒绝',
  PROFILE_UPDATED: '个人资料更新成功',
  PASSWORD_CHANGED: '密码修改成功'
} as const
