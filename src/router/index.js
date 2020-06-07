import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainTopBottom from '@/components/MainTopBottom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: '谷粒捐物资捐赠系统-首页',
      component: MainTopBottom
    }
  ]
})
