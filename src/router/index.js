import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content'
import Javascript from '@/components/javascript'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/Javascript',  
      name: 'Javascript',
      component: Javascript
    }
  ]
})
