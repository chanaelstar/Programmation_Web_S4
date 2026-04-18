<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllFossils } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'
import GalleryControls from '@/components/common/GalleryControls.vue'

const router = useRouter()

function goToDetail(name) {
  router.push(`/fossils/${name}`)
}

const fossils = ref([])
const loading = ref(true)
const sortKey = ref(localStorage.getItem('fossil-sort') || 'name-asc')
const filterKey = ref(localStorage.getItem('fossil-filter') || 'all')
const searchQuery = ref('')

// Mémorise les préférences de tri/filtre entre les visites
watch(sortKey, (val) => localStorage.setItem('fossil-sort', val))
watch(filterKey, (val) => localStorage.setItem('fossil-filter', val))

const { isCollected, isGroupComplete } = useCollection()

// Map groupName -> [fossilNames] pour détecter les groupes complets
const completedGroups = computed(() => {
  const groupMap = {}
  for (const f of fossils.value) {
    if (!f.fossil_group) continue
    if (!groupMap[f.fossil_group]) groupMap[f.fossil_group] = []
    groupMap[f.fossil_group].push(f.name)
  }
  const result = new Set()
  for (const [group, names] of Object.entries(groupMap)) {
    if (isGroupComplete(names)) result.add(group)
  }
  return result
})

onMounted(async () => {
  try {
    fossils.value = await fetchAllFossils()
  } finally {
    loading.value = false
  }
})

const sortedFilteredFossils = computed(() => {
  let list = [...fossils.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(f => f.name.toLowerCase().startsWith(q))
  }

  if (filterKey.value === 'collected') {
    list = list.filter(f => isCollected(f.name))
  } else if (filterKey.value === 'not-collected') {
    list = list.filter(f => !isCollected(f.name))
  }

  list.sort((a, b) => {
    if (sortKey.value === 'name-asc') return a.name.localeCompare(b.name)
    if (sortKey.value === 'name-desc') return b.name.localeCompare(a.name)
    if (sortKey.value === 'price-asc') return (a.sell || 0) - (b.sell || 0)
    if (sortKey.value === 'price-desc') return (b.sell || 0) - (a.sell || 0)
    return 0
  })

  return list
})
</script>

<template>
  <div>
    <div class="gallery-header">
      <h2 class="gallery-title">🦕 Fossils</h2>
      <GalleryControls
        sort-id="fossil-sort"
        filter-id="fossil-filter"
        search-placeholder="Search fossils…"
        :sort-key="sortKey"
        :filter-key="filterKey"
        :search-query="searchQuery"
        @update:sort-key="sortKey = $event"
        @update:filter-key="filterKey = $event"
        @update:search-query="searchQuery = $event"
      />
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <TransitionGroup v-else name="card" tag="div" class="gallery-grid">
      <div
        v-for="fossil in sortedFilteredFossils"
        :key="fossil.name"
        class="card-link"
        @click="goToDetail(fossil.name)"
      >
        <AppCard
          :name="fossil.name"
          :image_url="fossil.image_url"
          :fossil_group="fossil.fossil_group"
          :group_complete="fossil.fossil_group ? completedGroups.has(fossil.fossil_group) : false"
        />
      </div>
    </TransitionGroup>

    <p v-if="!loading && sortedFilteredFossils.length === 0" class="empty-state">
      No fossils match this filter.
    </p>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  color: #9ecfb8;
  margin-top: 2rem;
  font-size: 1rem;
}

.card-link {
  display: block;
  cursor: pointer;
}

</style>
