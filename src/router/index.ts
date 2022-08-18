import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Index,
		},
		{
			path: '/index',
			component: () => import('../components/HelloWorld.vue'),
		},
	],
})
