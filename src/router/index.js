// import Vue from 'vue'
import Vue from 'vue/dist/vue.common'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home";

import ProjectList from "@/components/project/ProjectList";
import ProjectDetail from "@/components/project/ProjectDetail";
import DonateList from "@/components/project/DonateList";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: ()=>import('../components/Home')
    },
    {
      path: '/home',
      name: '谷粒捐物资捐赠系统-首页',
      component: Home
    },
    {
      path: '/projectList',
      name: '谷粒捐物资捐赠系统-项目列表',
      component: ProjectList
    },
    {
      path:'/projectDetail',
      name:'',
      component: ProjectDetail,
      children:[
        {
          path:'donateList',
          name:'',
          component: DonateList
        }
      ]
    }
  ]
})
