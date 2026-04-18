<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleFossil } from '@/services/api.js'
import FossilDetail from '@/components/fossils/FossilDetail.vue'

const route = useRoute()
const fossil = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const data = await fetchSingleFossil(route.params.name)
    const item = Array.isArray(data) ? data[0] : data
    if (item && item.name) {
      fossil.value = item
    } else {
      error.value = true
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <FossilDetail :fossil="fossil" :loading="loading" :error="error" />
</template>
