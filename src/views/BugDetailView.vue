<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchSingleBug } from '@/services/api.js'
import BugDetail from '@/components/bugs/BugDetail.vue'

const route = useRoute()
const bug = ref(null)
const loading = ref(true)
const error = ref(false)

watch(
  () => route.params.name,
  async (name) => {
    loading.value = true
    error.value = false
    bug.value = null
    try {
      const data = await fetchSingleBug(name)
      const item = Array.isArray(data) ? data[0] : data
      if (item && item.name) {
        bug.value = item
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
  <BugDetail :bug="bug" :loading="loading" :error="error" />
</template>
