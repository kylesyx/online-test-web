import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Home from '@/components/Home.vue'
import Home2 from '@/components/Home2.vue'

//const Login=resolve=> require(['@/components/Login'],resolve)
Vue.use(Router)

export default new Router({
  base: './',
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path:'/Register',
      name:'注册',
      component:Register
    },
    {
      path:'/Home',
      name:'主界面',
      component:Home
    },
    {
      path:'/Home2',
      name:'管理员界面',
      component:Home2
    }
  ]
})
