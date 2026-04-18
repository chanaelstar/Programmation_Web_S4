<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllBugs } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'
import GalleryControls from '@/components/common/GalleryControls.vue'

const router = useRouter()

function goToDetail(name) {
  router.push(`/bugs/${name}`)
}

const bugs = ref([])
const loading = ref(true)
const sortKey = ref(localStorage.getItem('bug-sort') || 'name-asc')
const filterKey = ref(localStorage.getItem('bug-filter') || 'all')
const searchQuery = ref('')

const { isCollected } = useCollection()

watch(sortKey, (val) => localStorage.setItem('bug-sort', val))
watch(filterKey, (val) => localStorage.setItem('bug-filter', val))

onMounted(async () => {
  try {
    bugs.value = await fetchAllBugs()
  } finally {
    loading.value = false
  }
})

const sortedFilteredBugs = computed(() => {
  let list = [...bugs.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(b => b.name.toLowerCase().startsWith(q))
  }

  if (filterKey.value === 'collected') {
    list = list.filter(b => isCollected(b.name))
  } else if (filterKey.value === 'not-collected') {
    list = list.filter(b => !isCollected(b.name))
  }

  list.sort((a, b) => {
    if (sortKey.value === 'name-asc') return a.name.localeCompare(b.name)
    if (sortKey.value === 'name-desc') return b.name.localeCompare(a.name)
    if (sortKey.value === 'price-asc') return (a.sell_nook || 0) - (b.sell_nook || 0)
    if (sortKey.value === 'price-desc') return (b.sell_nook || 0) - (a.sell_nook || 0)
    return 0
  })

  return list
})
</script>

<template>
  <div>
    <div class="gallery-header">
      <h2 class="gallery-title">🦋 Bugs</h2>
      <GalleryControls
        sort-id="bug-sort"
        filter-id="bug-filter"
        search-placeholder="Search bugs…"
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
        v-for="bug in sortedFilteredBugs"
        :key="bug.name"
        class="card-link"
        @click="goToDetail(bug.name)"
      >
        <AppCard
          :name="bug.name"
          :image_url="bug.image_url"
          :rarity="bug.rarity"
        />
      </div>
    </TransitionGroup>

    <p v-if="!loading && sortedFilteredBugs.length === 0" class="empty-state">
      No bugs match this filter.
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
