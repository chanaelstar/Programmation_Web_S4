<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchAllArtworks } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import AppCard from '@/components/common/AppCard.vue'
import GalleryControls from '@/components/common/GalleryControls.vue'

const router = useRouter()

function goToDetail(name) {
  router.push(`/artworks/${name}`)
}

const artworks = ref([])
const loading = ref(true)
const sortKey = ref(localStorage.getItem('artwork-sort') || 'name-asc')
const filterKey = ref(localStorage.getItem('artwork-filter') || 'all')
const searchQuery = ref('')

const { isCollected } = useCollection()

watch(sortKey, (val) => localStorage.setItem('artwork-sort', val))
watch(filterKey, (val) => localStorage.setItem('artwork-filter', val))

onMounted(async () => {
  try {
    artworks.value = await fetchAllArtworks()
  } finally {
    loading.value = false
  }
})

const sortedFilteredArtworks = computed(() => {
  let list = [...artworks.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(a => a.name.toLowerCase().includes(q))
  }

  if (filterKey.value === 'collected') {
    list = list.filter(a => isCollected(a.name))
  } else if (filterKey.value === 'not-collected') {
    list = list.filter(a => !isCollected(a.name))
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
      <h2 class="gallery-title">🖼️ Artworks</h2>
      <GalleryControls
        sort-id="art-sort"
        filter-id="art-filter"
        search-placeholder="Search artworks…"
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
        v-for="art in sortedFilteredArtworks"
        :key="art.name"
        class="card-link"
        @click="goToDetail(art.name)"
      >
        <AppCard
          :name="art.name"
          :image_url="art.image_url"
          :art_name="art.art_name"
          :art_type="art.art_type"
          :has_fake="art.has_fake"
        />
      </div>
    </TransitionGroup>

    <p v-if="!loading && sortedFilteredArtworks.length === 0" class="empty-state">
      No artworks match this filter.
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
