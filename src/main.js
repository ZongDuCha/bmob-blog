// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.css'
import 'font-awesome-animation/dist/font-awesome-animation.css'
import Quill from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(NProgress,Quill)
Vue.config.productionTip = false

/* eslint-disable no-new  */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: { App }
})
