import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/telefonolist'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'telefonolist',
        name:'telefonolist',
        component:() =>import ('@/views/TelefonoList.vue')
      },
      {
        path: 'telefononuevo',
        name:'telefononuevo',
        component:() =>import ('@/views/TelefonoNuevo.vue')
      }
    
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
