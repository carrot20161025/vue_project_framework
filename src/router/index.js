import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'

Vue.use(Router)

import index from "./index/"
import dynamic from "./dynamic/"
import myCenter from "./myCenter/"
import shoppingCart from "./shoppingCart/"

export default new Router({
	// mode: 'history',
  routes: [
  	{
    	path: '/reg',
      component: resolve => require.ensure([], () => resolve(require('@/pages/loginAndReg/reg')), 'reg'), 
  	},
    {
    	path: '/login',
    	component: resolve => require.ensure([], () => resolve(require('@/pages/loginAndReg/login')), 'login'), 
  	},
    {
      path: '/',
      name: '首页tab入口',
      component: resolve => require.ensure([], () => resolve(require('@/pages/index/container')), 'index'), 
      redirect: '/index',
      children: [...index]
    },
    {
      path: '/dynamic',
      component: resolve => require.ensure([], () => resolve(require('@/pages/dynamic/container')), 'dynamic'), 
      redirect: '/dynamic/index',
      children: [...dynamic],
      // 进入该路由之前将底部tab栏设置为对应的活跃状态
      beforeEnter(to,from,next) {
        // tab页下所有动态发布模块拦截
        // 触发actions的setCurrentTab
        store.dispatch('setCurrentTab', 1)
        next()
      }
    },
    {
      path: '/shoppingCart',
      component: resolve => require.ensure([], () => resolve(require('@/pages/shoppingCart/container')), 'shoppingCart'), 
      redirect: '/shoppingCart/index',
      children: [...shoppingCart],
      // 进入该路由之前将底部tab栏设置为对应的活跃状态
      beforeEnter(to,from,next) {
        // tab页下所有购物车模块拦截
        // 触发actions的setCurrentTab
        store.dispatch('setCurrentTab', 2)
        next()
      }
    },
    {
      path: '/myCenter',
      component: resolve => require.ensure([], () => resolve(require('@/pages/myCenter/container')), 'myCenter'), 
      redirect: '/myCenter/index',
      children: [...myCenter],
      // 进入该路由之前将底部tab栏设置为对应的活跃状态
      beforeEnter(to,from,next) {
        // tab页下所有个人中心模块拦截
        // 触发actions的setCurrentTab
        store.dispatch('setCurrentTab', 3)
        next()
      }
    },
    
    //如果地址栏出错，重定向到首页
    {
      path: '*',
      redirect: '/'
    }
  ]
})
