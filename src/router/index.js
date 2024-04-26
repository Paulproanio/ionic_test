import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import BuscarPlanta from '@/views/BuscarPlanta.vue'
import BuscarLote from '@/views/BuscarLote.vue'
import MostrarPlanta from '@/views/MostrarPlanta.vue'
import RegistroCrecimiento from '@/views/RegistroCrecimiento.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/buscarplanta'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'telefonolist',
        name: 'telefonolist',
        component: () => import('@/views/TelefonoList.vue')
      },
      {
        path: 'telefononuevo',
        name: 'telefononuevo',
        component: () => import('@/views/TelefonoNuevo.vue')
      },
      {
        path: 'buscarplanta',
        name: 'buscarplanta',
        component: BuscarPlanta
      },
      {
        path: 'buscarlote',
        name: 'buscarlote',
        component: BuscarLote
      },
      {
        path: 'registrocrecimiento',
        name: 'registrocrecimiento',
        component: () => import('@/views/RegistroCrecimiento.vue')
      },
      {
        path: 'planta/:idPlanta',
        name: 'planta',
        component: MostrarPlanta
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
