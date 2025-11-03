import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    // HTML页面路由 - 首页
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HtmlPageView.vue')
    },
    // HTML页面路由 - 关于
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/HtmlPageView.vue')
    },
    // 文档类型路由 - 技术文档
    {
      path: '/tech/:groupId',
      name: 'tech-group',
      component: () => import('../views/GroupView.vue')
    },
    {
      path: '/tech/article/:articleId',
      name: 'tech-article',
      component: () => import('../views/ArticleDetailView.vue')
    },
    // 文档类型路由 - 生活随笔
    {
      path: '/life/:groupId',
      name: 'life-group',
      component: () => import('../views/GroupView.vue')
    },
    {
      path: '/life/article/:articleId',
      name: 'life-article',
      component: () => import('../views/ArticleDetailView.vue')
    },
    // 旧路由保留（向后兼容）
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/tag/:slug',
      name: 'tag',
      component: () => import('../views/TagView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/DashboardView.vue')
        },
        {
          path: 'posts',
          name: 'admin-posts',
          component: () => import('../views/admin/PostsView.vue')
        },
        {
          path: 'posts/new',
          name: 'admin-post-new',
          component: () => import('../views/admin/PostEditView.vue')
        },
        {
          path: 'posts/:id/edit',
          name: 'admin-post-edit',
          component: () => import('../views/admin/PostEditView.vue')
        }
      ]
    }
  ]
})

export default router
