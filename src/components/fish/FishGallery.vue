<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllFish, fetchAllSeaCreatures } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'

const router = useRouter()

function goToDetail(name) {
  router.push(`/fish/${name}`)
}

const fish = ref([])
const seaCreatures = ref([])
const loading = ref(true)
const sortKey = ref('name-asc')
const filterKey = ref('all')
const activeTab = ref('fish')

const { isCollected } = useCollection()

onMounted(async () => {
  try {
    const [fishData, seaData] = await Promise.all([
      fetchAllFish(),
      fetchAllSeaCreatures()
    ])
    fish.value = fishData
    seaCreatures.value = seaData
  } finally {
    loading.value = false
  }
})

const sortedFilteredItems = computed(() => {
  let list = activeTab.value === 'fish' ? [...fish.value] : [...seaCreatures.value]

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
      <div class="gallery-title-row">
        <h2 class="gallery-title">🐟 Fish</h2>
        <div class="tab-buttons">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'fish' }"
            @click="activeTab = 'fish'"
          >Poissons</button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'sea' }"
            @click="activeTab = 'sea'"
          >Créatures marines</button>
        </div>
      </div>
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

    <div v-else class="gallery-grid">
      <div
        v-for="item in sortedFilteredItems"
        :key="item.name"
        class="card-link"
        @click="activeTab === 'fish' ? goToDetail(item.name) : null"
      >
        <AppCard
          :name="item.name"
          :image_url="item.image_url"
        />
      </div>
    </div>

    <p v-if="!loading && sortedFilteredItems.length === 0" class="empty-state">
      No {{ activeTab === 'fish' ? 'fish' : 'sea creatures' }} match this filter.
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

.gallery-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tab-buttons {
  display: flex;
  gap: 0.5rem;
}

.tab-btn {
  padding: 0.35rem 0.9rem;
  border: 2px solid #2e7d32;
  border-radius: 999px;
  background: transparent;
  color: #2e7d32;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tab-btn.active {
  background: #2e7d32;
  color: #fff;
}

.tab-btn:not(.active):hover {
  background: #e8f5e9;
}
</style>
