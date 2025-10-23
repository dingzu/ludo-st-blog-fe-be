import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TestView.vue')
    },
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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
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
