import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MainTop from '@/components/MainTop'
import MainBottom from "@/components/MainBottom";
import ProjectList from "@/components/project/ProjectList";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '谷粒捐物资捐赠系统-首页',
      component: {MainTop,MainBottom}
    },
    {
      path: '/projectList',
      name: '谷粒捐物资捐赠系统-项目列表',
      component: ProjectList
    },
  ]
})
