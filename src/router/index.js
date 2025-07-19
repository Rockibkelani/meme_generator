import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/gallery', component: Gallery }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
