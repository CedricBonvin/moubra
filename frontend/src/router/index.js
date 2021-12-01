import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../views/Accueil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/Formulaire-commande',
    name: 'Formulaire-commande',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Formulaire-commande.vue')
  },
  {
    path: '/Panier',
    name: 'Panier',
    component: () => import(/* webpackChunkName: "about" */ '../views/Panier.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/user.vue')
  },
  {
    path: '/abonnement',
    name: 'abonnement',
    component: () => import(/* webpackChunkName: "about" */ '../views/abonnement.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
