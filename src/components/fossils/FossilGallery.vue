<script setup>
import { ref, onMounted } from 'vue'
import { fetchAllFossils } from '../../services/api' 
import AppCard from '../common/AppCard.vue'

const fossils = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // On appelle l'API "All fossils"
    fossils.value = await fetchAllFossils()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="gallery-container">
    <h2>Galerie des Fossiles</h2>
    
    <div v-if="loading">Chargement...</div>
    
    <div v-else class="grid">
      <AppCard
        v-for="fossil in fossils"
        :key="fossil.name"
        :name="fossil.name"
        :image_url="fossil.image_url"
        :fossil_group="fossil.fossil_group"
        :sell="fossil.sell"
      />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>