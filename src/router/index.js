import Vue from 'vue'
import Router from 'vue-router'
import Manage from '../views/manage/Manage'
import Register from '../views/register/Register'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Register',
      component: Register
    },

    {
      path: '/manage',
      name: 'Manage',
      component: Manage
    }
  ]
})
