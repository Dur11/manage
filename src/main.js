import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import api from './api/axios'
import store from '@/store'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.api = api

// router.beforeEach((to, from, next) => {

//   const token = this.$store.state.token
//   if (!token && to.name !== 'login') {
//       next({ name: 'login' })
//   }else {
//       next()
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
