import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FossilGallery from '@/components/fossils/FossilGallery.vue'
import ArtworkGallery from '@/components/artworks/ArtworkGallery.vue'
import BugGallery from '@/components/bugs/BugGallery.vue'
import BugDetailView from '@/views/BugDetailView.vue'
import FishGallery from '@/components/fish/FishGallery.vue'
import FishDetailView from '@/views/FishDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/fossils', component: FossilGallery },
  { path: '/artworks', component: ArtworkGallery },
  { path: '/bugs', component: BugGallery },
  { path: '/bugs/:name', component: BugDetailView },
  { path: '/fish', component: FishGallery },
  { path: '/fish/:name', component: FishDetailView },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
