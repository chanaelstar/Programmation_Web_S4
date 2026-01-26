<script setup>
import FossilCard from './components/card.vue';

import { fetchFossils } from './services/api.js';
fetchFossils();
</script>

<template>
  <FossilCard />
</template>

<style scoped>
</style>
