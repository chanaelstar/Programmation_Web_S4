import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FossilsView from '@/views/FossilsView.vue'
import ArtworksView from '@/views/ArtworksView.vue'
import BugsView from '@/views/BugsView.vue'
import FishView from '@/views/FishView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/fossils', component: FossilsView },
  { path: '/artworks', component: ArtworksView },
  { path: '/bugs', component: BugsView },
  { path: '/fish', component: FishView },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
