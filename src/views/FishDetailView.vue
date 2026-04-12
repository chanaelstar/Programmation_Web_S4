<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleFish } from '@/services/api.js'
import FishDetail from '@/components/fish/FishDetail.vue'

const route = useRoute()
const fish = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const data = await fetchSingleFish(route.params.name)
    const item = Array.isArray(data) ? data[0] : data
    if (item && item.name) {
      fish.value = item
    } else {
      error.value = true
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <FishDetail :fish="fish" :loading="loading" :error="error" />
</template>
