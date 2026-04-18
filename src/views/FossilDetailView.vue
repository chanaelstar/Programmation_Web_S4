<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleFossil, fetchSingleFossilIndividual } from '@/services/api.js'
import FossilDetail from '@/components/fossils/FossilDetail.vue'

const route = useRoute()
const fossil = ref(null)
const group = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const data = await fetchSingleFossil(route.params.name)
    const groupData = Array.isArray(data) ? data[0] : data

    if (groupData && groupData.fossils) {
      // Fossil avec groupe
      group.value = groupData
      const matchedName = groupData.matched?.name
      const found = groupData.fossils.find(f => f.name === matchedName)
        || groupData.fossils.find(f => f.name.toLowerCase() === route.params.name.toLowerCase())
        || groupData.fossils[0]
      fossil.value = found
    } else {
      // Fossil standalone (ex: amber) — fallback sur l'endpoint individuals
      const individual = await fetchSingleFossilIndividual(route.params.name)
      if (!individual) { error.value = true; return }
      fossil.value = individual
      group.value = null
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <FossilDetail :fossil="fossil" :group="group" :loading="loading" :error="error" />
</template>
