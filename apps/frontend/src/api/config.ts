// API配置文件
// 根据环境自动选择API基础URL
const getBaseUrl = () => {
  // 优先使用环境变量
  if ((import.meta as any).env?.VITE_API_URL) {
    return (import.meta as any).env.VITE_API_URL
  }
  
  // 判断是否为生产环境
  const isProduction = (import.meta as any).env?.MODE === 'production' || 
                       (import.meta as any).env?.PROD === true ||
                       window.location.href.includes('vercel.app') ||
                       window.location.href.includes('railway.app') ||
                       window.location.href.includes('ludost.cn')
  
  if (isProduction) {
    // 生产环境使用Railway公开域名
    return 'https://ludostbackend-production.up.railway.app'
  }
  
  // 开发环境使用本地后端
  return 'http://localhost:3001'
}

export const API_CONFIG = {
  // 获取API基础URL
  BASE_URL: getBaseUrl(),
  UPLOAD_URL: (import.meta as any).env?.VITE_UPLOAD_URL || `${getBaseUrl()}/api/upload`,
  
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

// 调试：输出当前使用的API基础URL
console.log('🌐 API Base URL:', API_CONFIG.BASE_URL)

// 导出配置（默认导出）
export default API_CONFIG
