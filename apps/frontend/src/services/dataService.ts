// 数据服务 - 统一的数据访问接口
// 可以在 Mock 数据和真实 API 之间切换

import { ENV } from '@/config/env';
import type { NavItem, Article, ArticleGroup } from '@/mock/data';
import { 
  mockNavItems, 
  getAllArticles as getMockAllArticles,
  getNavItemById as getMockNavItemById,
  getArticleById as getMockArticleById,
  getGroupById as getMockGroupById 
} from '@/mock/data';
import { apiService } from './apiService';

/**
 * 数据服务类
 * 根据环境配置自动选择数据源（Mock 或 API）
 */
class DataService {
  /**
   * 判断是否使用 Mock 数据
   */
  private get useMock(): boolean {
    return ENV.API_MODE === 'mock';
  }

  /**
   * 获取所有导航项
   */
  async getNavItems(): Promise<NavItem[]> {
    if (this.useMock) {
      console.log('📦 使用 Mock 数据: 导航项');
      return Promise.resolve(mockNavItems);
    }
    
    console.log('🌐 请求 API: 导航项');
    return apiService.getNavItems();
  }

  /**
   * 根据ID获取导航项
   */
  async getNavItemById(id: string): Promise<NavItem | undefined> {
    if (this.useMock) {
      return Promise.resolve(getMockNavItemById(id));
    }
    
    return apiService.getNavItemById(id);
  }

  /**
   * 获取所有文章
   */
  async getAllArticles(): Promise<Article[]> {
    if (this.useMock) {
      console.log('📦 使用 Mock 数据: 所有文章');
      return Promise.resolve(getMockAllArticles());
    }
    
    console.log('🌐 请求 API: 所有文章');
    return apiService.getAllArticles();
  }

  /**
   * 根据ID获取文章
   */
  async getArticleById(id: string): Promise<Article | undefined> {
    if (this.useMock) {
      console.log('📦 使用 Mock 数据: 文章详情', id);
      return Promise.resolve(getMockArticleById(id));
    }
    
    console.log('🌐 请求 API: 文章详情', id);
    return apiService.getArticleById(id);
  }

  /**
   * 根据ID获取文章组
   */
  async getGroupById(id: string): Promise<ArticleGroup | undefined> {
    if (this.useMock) {
      console.log('📦 使用 Mock 数据: 文章组', id);
      return Promise.resolve(getMockGroupById(id));
    }
    
    console.log('🌐 请求 API: 文章组', id);
    return apiService.getGroupById(id);
  }

  /**
   * 根据导航路径获取文章组列表
   */
  async getGroupsByNavPath(navPath: string): Promise<ArticleGroup[]> {
    if (this.useMock) {
      const nav = mockNavItems.find(n => n.path === navPath);
      return Promise.resolve(nav?.groups || []);
    }
    
    return apiService.getGroupsByNavPath(navPath);
  }

  /**
   * 搜索文章
   */
  async searchArticles(keyword: string): Promise<Article[]> {
    if (this.useMock) {
      const allArticles = getMockAllArticles();
      return Promise.resolve(
        allArticles.filter(article => 
          article.title.includes(keyword) || 
          article.summary.includes(keyword) ||
          article.tags.some(tag => tag.includes(keyword))
        )
      );
    }
    
    return apiService.searchArticles(keyword);
  }

  /**
   * 根据标签获取文章
   */
  async getArticlesByTag(tag: string): Promise<Article[]> {
    if (this.useMock) {
      const allArticles = getMockAllArticles();
      return Promise.resolve(
        allArticles.filter(article => article.tags.includes(tag))
      );
    }
    
    return apiService.getArticlesByTag(tag);
  }
}

// 导出单例
export const dataService = new DataService();

