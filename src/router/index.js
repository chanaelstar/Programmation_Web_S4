import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FossilGallery from '@/components/fossils/FossilGallery.vue'
import FossilDetailView from '@/views/FossilDetailView.vue'
import ArtworkGallery from '@/components/artworks/ArtworkGallery.vue'
import ArtworkDetailView from '@/views/ArtworkDetailView.vue'
import BugGallery from '@/components/bugs/BugGallery.vue'
import BugDetailView from '@/views/BugDetailView.vue'
import FishGallery from '@/components/fish/FishGallery.vue'
import FishDetailView from '@/views/FishDetailView.vue'
import SeaCreatureDetailView from '@/views/SeaCreatureDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/fossils', component: FossilGallery },
  { path: '/fossils/:name', component: FossilDetailView },
  { path: '/artworks', component: ArtworkGallery },
  { path: '/artworks/:name', component: ArtworkDetailView },
  { path: '/bugs', component: BugGallery },
  { path: '/bugs/:name', component: BugDetailView },
  { path: '/fish', component: FishGallery },
  { path: '/fish/:name', component: FishDetailView },
  { path: '/sea/:name', component: SeaCreatureDetailView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
