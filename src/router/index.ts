import { createRouter, createWebHistory } from 'vue-router'
import PageContent from '../components/PageContent.vue'
import AboutView from '../views/AboutView.vue'
import ArticleSlug from '../views/ArticleSlug.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageContent
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: ArticleSlug
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/BlogsView.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import('../views/BlogSlug.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
