<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleSeaCreature } from '@/services/api.js'
import SeaCreatureDetail from '@/components/fish/SeaCreatureDetail.vue'

const route = useRoute()
const creature = ref(null)
const loading = ref(true)
const error = ref(false)

watch(
  () => route.params.name,
  async (name) => {
    loading.value = true
    error.value = false
    creature.value = null
    try {
      const data = await fetchSingleSeaCreature(name)
      const item = Array.isArray(data) ? data[0] : data
      if (item && item.name) {
        creature.value = item
      } else {
        error.value = true
      }
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)
</script>

<template>
  <SeaCreatureDetail :creature="creature" :loading="loading" :error="error" />
</template>
