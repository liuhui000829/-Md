import Vue from 'vue'
import Router from 'vue-router'
// import User from '../components/user/demo'
import HelloWord from '../components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWord //组件名称，这个路由对应跳转的组件
    }
    // ,
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: User //组件名称，这个路由对应跳转的组件
    // }
  ]
})
