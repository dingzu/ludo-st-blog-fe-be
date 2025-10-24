// API配置文件
export const API_CONFIG = {
  // 从环境变量获取API基础URL，如果没有则使用默认值
  BASE_URL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001',
  UPLOAD_URL: (import.meta as any).env?.VITE_UPLOAD_URL || 'http://localhost:3001/api/upload',
  
  // API端点
  ENDPOINTS: {
    API: '/api',
    POSTS: '/api/posts',
    CATEGORIES: '/api/categories',
    TAGS: '/api/tags',
    COMMENTS: '/api/comments',
    AUTH: '/api/auth',
    UPLOAD: '/api/upload'
  }
}

// 创建完整的API URL
export const getApiUrl = (endpoint: string) => {
  // 确保BASE_URL是完整的URL（包含协议）
  const baseUrl = API_CONFIG.BASE_URL
  
  // 如果endpoint已经包含完整URL，直接返回
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint
  }
  
  // 确保baseUrl以/结尾，endpoint以/开头
  const cleanBaseUrl = baseUrl.replace(/\/$/, '')
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  return `${cleanBaseUrl}${cleanEndpoint}`
}

// 导出配置（默认导出）
export default API_CONFIG
