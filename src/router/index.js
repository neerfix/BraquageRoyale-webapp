import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Authentication from '@/views/Authentication'
import Dashboard from '@/views/Dashboard'
import CreateNewGame from "@/views/CreateNewGame";
import GameInProgress from "@/views/GameInProgress";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/create_new_game',
    name: 'CreateNewGame',
    component: CreateNewGame
  },
  {
    path: '/game_in_progress',
    name: 'GameInProgress',
    component: GameInProgress
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
