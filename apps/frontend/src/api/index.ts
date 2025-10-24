// API服务文件
import { getApiUrl, API_CONFIG } from './config'

// 导出配置和工具函数
export { getApiUrl, API_CONFIG }

// 通用API请求函数
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = getApiUrl(endpoint)
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API请求失败:', error)
    throw error
  }
}

// 测试API连接
export const testApiConnection = async () => {
  return apiRequest(API_CONFIG.ENDPOINTS.API)
}

// 文章相关API
export const postsApi = {
  // 获取所有文章
  getAll: () => apiRequest(API_CONFIG.ENDPOINTS.POSTS),
  
  // 根据ID获取文章
  getById: (id: string) => apiRequest(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`),
  
  // 创建文章
  create: (data: any) => apiRequest(API_CONFIG.ENDPOINTS.POSTS, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  // 更新文章
  update: (id: string, data: any) => apiRequest(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // 删除文章
  delete: (id: string) => apiRequest(`${API_CONFIG.ENDPOINTS.POSTS}/${id}`, {
    method: 'DELETE'
  })
}

// 分类相关API
export const categoriesApi = {
  getAll: () => apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES),
  getBySlug: (slug: string) => apiRequest(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${slug}`)
}

// 标签相关API
export const tagsApi = {
  getAll: () => apiRequest(API_CONFIG.ENDPOINTS.TAGS),
  getBySlug: (slug: string) => apiRequest(`${API_CONFIG.ENDPOINTS.TAGS}/${slug}`)
}

// 评论相关API
export const commentsApi = {
  getByPost: (postId: string) => apiRequest(`${API_CONFIG.ENDPOINTS.COMMENTS}?postId=${postId}`),
  create: (data: any) => apiRequest(API_CONFIG.ENDPOINTS.COMMENTS, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}
