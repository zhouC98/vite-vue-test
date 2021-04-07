import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', 
    redirect: '/home',
    component: () => import('../layouts/default.vue'), 
    children: [
      { path: '/home', component: () => import('../pages/Home.vue') , meta: { title: 'home' } },
      { path: '/about', component: () => import('../pages/About.vue') , meta: { title: 'About' } },
      { path: '/hqchart', component: () => import('../pages/hqchart.vue') , meta: { title: 'hqchart' } },
      { path: '/scrollList', component: () => import('../pages/scrollList.vue') , meta: { title: 'scrollList' } },
      { path: '/k', component: () => import('../pages/k.vue') , meta: { title: 'k' } }
    ] 
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
