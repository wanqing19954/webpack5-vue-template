import Vue from 'vue'
import VueRouter from 'vue-router';
import Index from '../index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/hello',
      component: () => import('../components/HelloWorld.vue')
    }
  ]
})

export default router