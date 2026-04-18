<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleArtwork } from '@/services/api.js'
import ArtworkDetail from '@/components/artworks/ArtworkDetail.vue'

const route = useRoute()
const artwork = ref(null)
const loading = ref(true)
const error = ref(false)

watch(
  () => route.params.name,
  async (name) => {
    loading.value = true
    error.value = false
    artwork.value = null
    try {
      const data = await fetchSingleArtwork(name)
      const item = Array.isArray(data) ? data[0] : data
      if (item && item.name) {
        artwork.value = item
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
  <ArtworkDetail :artwork="artwork" :loading="loading" :error="error" />
</template>
