// API 服务 - 真实后端 API 调用
import { ENV } from '@/config/env';
import type { NavItem, Article, ArticleGroup } from '@/mock/data';

/**
 * HTTP 请求封装
 */
class HttpClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = ENV.API_BASE_URL;
    this.timeout = ENV.API_TIMEOUT;
  }

  /**
   * 发送请求
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      if (ENV.ENABLE_API_LOG) {
        console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
      }

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (ENV.ENABLE_API_LOG) {
        console.log(`✅ API Response:`, data);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (ENV.ENABLE_API_LOG) {
        console.error(`❌ API Error: ${url}`, error);
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

/**
 * API 服务类
 */
class ApiService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  /**
   * 获取所有导航项
   */
  async getNavItems(): Promise<NavItem[]> {
    return this.http.get<NavItem[]>('/nav-items');
  }

  /**
   * 根据ID获取导航项
   */
  async getNavItemById(id: string): Promise<NavItem | undefined> {
    try {
      return await this.http.get<NavItem>(`/nav-items/${id}`);
    } catch {
      return undefined;
    }
  }

  /**
   * 获取所有文章
   */
  async getAllArticles(): Promise<Article[]> {
    return this.http.get<Article[]>('/articles');
  }

  /**
   * 根据ID获取文章
   */
  async getArticleById(id: string): Promise<Article | undefined> {
    try {
      return await this.http.get<Article>(`/articles/${id}`);
    } catch {
      return undefined;
    }
  }

  /**
   * 根据ID获取文章组
   */
  async getGroupById(id: string): Promise<ArticleGroup | undefined> {
    try {
      return await this.http.get<ArticleGroup>(`/groups/${id}`);
    } catch {
      return undefined;
    }
  }

  /**
   * 根据导航路径获取文章组列表
   */
  async getGroupsByNavPath(navPath: string): Promise<ArticleGroup[]> {
    return this.http.get<ArticleGroup[]>(`/nav-items${navPath}/groups`);
  }

  /**
   * 搜索文章
   */
  async searchArticles(keyword: string): Promise<Article[]> {
    return this.http.get<Article[]>(`/articles/search?q=${encodeURIComponent(keyword)}`);
  }

  /**
   * 根据标签获取文章
   */
  async getArticlesByTag(tag: string): Promise<Article[]> {
    return this.http.get<Article[]>(`/articles?tag=${encodeURIComponent(tag)}`);
  }
}

// 导出单例
export const apiService = new ApiService();

