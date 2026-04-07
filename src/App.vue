<script setup>
import { ref, onMounted } from 'vue';
import AppCard from './components/common/AppCard.vue';

import { fetchAllFossils } from './services/api.js';

// variable réactive pour stocker les données des fossiles
const fossils = ref([]);

// On utilise onMounted pour charger les données au démarrage de l'application
onMounted(async () => {
  const data = await fetchAllFossils();
  if (data) {
    fossils.value = data; // On remplit notre variable
  }
});
</script>

<template>
  <h1>List of Fossils</h1>
  <div id="fossil-container">
  <AppCard 
      v-for="fossil in fossils" 
        :key="fossil.name" 
        :name="fossil.name"
        :image_url="fossil.image_url"
        :fossil_group="fossil.fossil_group"
        :sell="fossil.sell" 
    />
  </div>
</template>

<style scoped>
#fossil-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap : 20px;
  max-width: 1080px;
  margin: 0 auto;
}
</style>
