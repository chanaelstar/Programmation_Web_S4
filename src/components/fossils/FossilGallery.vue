<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllFossils } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'

const router = useRouter()

function goToDetail(name) {
  router.push(`/fossils/${name}`)
}

const fossils = ref([])
const loading = ref(true)
const sortKey = ref('name-asc')
const filterKey = ref('all')

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
      <div class="gallery-controls">
        <label for="fossil-sort">Sort</label>
        <select id="fossil-sort" v-model="sortKey">
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>

        <label for="fossil-filter">Filter</label>
        <select id="fossil-filter" v-model="filterKey">
          <option value="all">All</option>
          <option value="collected">Collected</option>
          <option value="not-collected">Not collected</option>
        </select>
      </div>
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
  color: #81c784;
  margin-top: 2rem;
  font-size: 1rem;
}

.card-link {
  display: block;
  cursor: pointer;
}
</style>
