<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchAllFossils, fetchAllArtworks, fetchAllBugs, fetchAllFish } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'

const { collected } = useCollection()

const categories = ref([
  { label: 'Fossils', path: '/fossils', icon: '🦕', count: null },
  { label: 'Artworks', path: '/artworks', icon: '🖼️', count: null },
  { label: 'Bugs', path: '/bugs', icon: '🦋', count: null },
  { label: 'Fish', path: '/fish', icon: '🐟', count: null },
])

const collectedCount = computed(() => collected.value.size)

onMounted(async () => {
  const [fossils, artworks, bugs, fish] = await Promise.all([
    fetchAllFossils(),
    fetchAllArtworks(),
    fetchAllBugs(),
    fetchAllFish(),
  ])
  categories.value[0].count = fossils.length
  categories.value[1].count = artworks.length
  categories.value[2].count = bugs.length
  categories.value[3].count = fish.length
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">🍃 ACNH Museum</h1>
      <p class="hero-subtitle">
        Browse every fossil, artwork, bug and fish from Animal Crossing: New Horizons.
        Track what you've collected!
      </p>
      <div class="hero-badge" v-if="collectedCount > 0">
        ✅ {{ collectedCount }} item{{ collectedCount > 1 ? 's' : '' }} collected
      </div>
    </section>

    <section class="categories">
      <RouterLink
        v-for="cat in categories"
        :key="cat.path"
        :to="cat.path"
        class="category-card"
      >
        <span class="category-icon">{{ cat.icon }}</span>
        <span class="category-label">{{ cat.label }}</span>
        <span class="category-count">
          {{ cat.count !== null ? cat.count + ' items' : '…' }}
        </span>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.hero {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #e8f5e9, #f9fbe7);
  border-radius: 1.5rem;
  border: 2px solid #c8e6c9;
}

.hero-title {
  font-family: 'qlarendon', serif;
  font-size: 2.5rem;
  color: #2e7d32;
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: #558b2f;
  max-width: 480px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  margin-top: 1.25rem;
  background-color: #4caf50;
  color: #fff;
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 0.95rem;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}

.category-card {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 1.25rem;
  border: 2px solid #c8e6c9;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
  border-color: #4caf50;
}

.category-icon {
  font-size: 2.5rem;
}

.category-label {
  font-family: 'qlarendon', serif;
  font-size: 1.2rem;
  color: #2e7d32;
  font-weight: 700;
}

.category-count {
  font-size: 0.85rem;
  color: #81c784;
  font-weight: 600;
}
</style>
