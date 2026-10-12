import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const BlogView = () => import('../views/BlogView.vue')
const ArticleView = () => import('../views/ArticleView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ProjectsView = () => import('../views/ProjectsView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      meta: {
        title: '博客'
      }
    },
    {
      path: '/blog/:slug',
      name: 'article',
      component: ArticleView,
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: '关于我'
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        title: '项目展示'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: '页面未找到'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫，用于设置页面标题
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Mike · Linux / C++ & AI`
  }
  next()
})

export default router

