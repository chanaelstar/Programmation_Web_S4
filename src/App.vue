<script setup>
import FossilCard from './components/card.vue';

import { fetchFossils } from './services/api.js';
fetchFossils();

import fossilData from './fossilData.js';
</script>

<template>
  <h1>List of Fossils</h1>
  <div id="fossil-container">
  <FossilCard 
      v-for="fossil in fossilData" 
      :key="fossil.id"
      :image="fossil.image_url"
      :name="fossil.name"
      :fossil_group="fossil.fossil_group"
      :sell_price="fossil.sell_price"
    />
  </div>
</template>

<style scoped>
#fossil-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
