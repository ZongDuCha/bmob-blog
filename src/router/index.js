import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content,
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
