<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleBug } from '@/services/api.js'
import BugDetail from '@/components/bugs/BugDetail.vue'

const route = useRoute()
const bug = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const data = await fetchSingleBug(route.params.name)
    const item = Array.isArray(data) ? data[0] : data
    if (item && item.name) {
      bug.value = item
    } else {
      error.value = true
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <BugDetail :bug="bug" :loading="loading" :error="error" />
</template>
