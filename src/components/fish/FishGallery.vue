<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAllFish } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'

const fish = ref([])
const loading = ref(true)
const sortKey = ref('name-asc')
const filterKey = ref('all')

const { isCollected } = useCollection()

onMounted(async () => {
  try {
    fish.value = await fetchAllFish()
  } finally {
    loading.value = false
  }
})

const sortedFilteredFish = computed(() => {
  let list = [...fish.value]

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
      <h2 class="gallery-title">🐟 Fish</h2>
      <div class="gallery-controls">
        <label for="fish-sort">Sort</label>
        <select id="fish-sort" v-model="sortKey">
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>

        <label for="fish-filter">Filter</label>
        <select id="fish-filter" v-model="filterKey">
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
        v-for="fish in sortedFilteredFish"
        :key="fish.name"
        :name="fish.name"
        :image_url="fish.image_url"
        :rarity="fish.rarity"
      />
    </TransitionGroup>

    <p v-if="!loading && sortedFilteredFish.length === 0" class="empty-state">
      No fish match this filter.
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
