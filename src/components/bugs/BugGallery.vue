<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAllBugs } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'

const bugs = ref([])
const loading = ref(true)
const sortKey = ref('name-asc')
const filterKey = ref('all')

const { isCollected } = useCollection()

onMounted(async () => {
  try {
    bugs.value = await fetchAllBugs()
  } finally {
    loading.value = false
  }
})

const sortedFilteredBugs = computed(() => {
  let list = [...bugs.value]

  if (filterKey.value === 'collected') {
    list = list.filter(b => isCollected(b.name))
  } else if (filterKey.value === 'not-collected') {
    list = list.filter(b => !isCollected(b.name))
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
      <h2 class="gallery-title">🦋 Bugs</h2>
      <div class="gallery-controls">
        <label for="bug-sort">Sort</label>
        <select id="bug-sort" v-model="sortKey">
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>

        <label for="bug-filter">Filter</label>
        <select id="bug-filter" v-model="filterKey">
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
      <AppCard
        v-for="bug in sortedFilteredBugs"
        :key="bug.name"
        :name="bug.name"
        :image_url="bug.image_url"
        :rarity="bug.rarity"
      />
    </TransitionGroup>

    <p v-if="!loading && sortedFilteredBugs.length === 0" class="empty-state">
      No bugs match this filter.
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
</style>
