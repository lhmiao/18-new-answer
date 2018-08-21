import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/components/BaseLayout'
import Login from '@/pages/Login'
import Answer from '@/pages/Answer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: BaseLayout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/answer',
          name: 'answer',
          component: Answer
        }
      ]
    }
  ]
})
