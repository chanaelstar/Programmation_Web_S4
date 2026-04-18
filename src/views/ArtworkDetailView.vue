<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleArtwork } from '@/services/api.js'
import ArtworkDetail from '@/components/artworks/ArtworkDetail.vue'

const route = useRoute()
const artwork = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const data = await fetchSingleArtwork(route.params.name)
    const item = Array.isArray(data) ? data[0] : data
    if (item && item.name) {
      artwork.value = item
    } else {
      error.value = true
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <ArtworkDetail :artwork="artwork" :loading="loading" :error="error" />
</template>
