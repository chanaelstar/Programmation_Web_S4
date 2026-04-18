<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleFossil, fetchSingleFossilIndividual } from '@/services/api.js'
import FossilDetail from '@/components/fossils/FossilDetail.vue'

const route = useRoute()
const fossil = ref(null)
const group = ref(null)
const loading = ref(true)
const error = ref(false)

// Se déclenche au montage (immediate) ET à chaque changement de fossile dans l'URL
watch(
  () => route.params.name,
  async (name) => {
    loading.value = true
    error.value = false
    fossil.value = null
    group.value = null

    try {
      const data = await fetchSingleFossil(name)
      const groupData = Array.isArray(data) ? data[0] : data

      if (groupData && groupData.fossils) {
        group.value = groupData
        const matchedName = groupData.matched?.name
        const found = groupData.fossils.find(f => f.name === matchedName)
          || groupData.fossils.find(f => f.name.toLowerCase() === name.toLowerCase())
          || groupData.fossils[0]
        fossil.value = found
      } else {
        const individual = await fetchSingleFossilIndividual(name)
        if (!individual) { error.value = true; return }
        fossil.value = individual
        group.value = null
      }
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <FossilDetail :fossil="fossil" :group="group" :loading="loading" :error="error" />
</template>
