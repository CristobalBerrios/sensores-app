import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Public/Login'
import AdminApp from '@/components/Admin/App'
import Sensor from '@/components/Sensor/Sensor'
import Simulator from '@/components/Simulator/Simulator'
import Credentials from '@/services/Credentials.service.js'

const credentials = new Credentials()

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      component: AdminApp,
      children: [
        {
          path: 'heartbeat',
          name: 'heartBeat',
          component: Sensor
        },
        {
          path: 'simulator',
          name: 'simulator',
          component: Simulator
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (credentials.isLogin()) {
    if (to.path === '/login') next({path: '/admin/heartbeat'})
    else next()
  } else {
    if (to.path === '/login') next()
    else next({path: '/login'})
  }
})

export default router
