import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Authentication from '@/views/Authentication'
import Dashboard from '@/views/Dashboard'
import CreateNewGame from "@/views/CreateNewGame";
import GameInProgress from '@/views/GameInProgress'
import Profil from '@/views/Profil';
import Lobby from "@/views/Lobby";

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
    path: '/create',
    name: 'CreateNewGame',
    component: CreateNewGame
  },
  {
    path: '/join',
    name: 'JoinGame'
  },
  {
    // path: '/lobby/{gameId}',
    path: '/lobby/:type',
    name: 'LobbyGame',
    component: Lobby
  },
  {
    path: '/game',
    name: 'Game',
    component: GameInProgress
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
