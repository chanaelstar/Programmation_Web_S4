<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { fetchAllFossils, fetchAllArtworks, fetchAllBugs, fetchAllFish, fetchAllSeaCreatures } from '@/services/api.js'
import { useCollection } from '@/composables/useCollection.js'
import fossilImg from '@/assets/images/plaque-fossil.png'
import artworkImg from '@/assets/images/plaque-artwork.png'
import bugsImg from '@/assets/images/plaque-bug.png'
import fishImg from '@/assets/images/plaque-fish.png'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const { collected } = useCollection()

const categories = ref([
  { label: 'Fossils', path: '/fossils', image: fossilImg, count: null, names: [] },
  { label: 'Artworks', path: '/artworks', image: artworkImg, count: null, names: [] },
  { label: 'Bugs', path: '/bugs', image: bugsImg, count: null, names: [] },
  { label: 'Fish', path: '/fish', image: fishImg, count: null, names: [] },
])

const collectedCount = computed(() => collected.value.size)

const chartCanvas = ref(null)
let chartInstance = null

function buildChart() {
  if (!chartCanvas.value) return
  const labels = categories.value.map(c => c.label)
  const totals = categories.value.map(c => c.count ?? 0)
  const collecteds = categories.value.map(c =>
    c.names.filter(n => collected.value.has(n)).length
  )

  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Collected',
          data: collecteds,
          backgroundColor: '#89E2AE',
          borderRadius: 6,
        },
        {
          label: 'Remaining',
          data: totals.map((t, i) => t - collecteds[i]),
          backgroundColor: '#c0e0d0',
          borderRadius: 6,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, grid: { display: false } },
      },
    },
  })
}

onMounted(async () => {
  const [fossils, artworks, bugs, fish, sea] = await Promise.all([
    fetchAllFossils(),
    fetchAllArtworks(),
    fetchAllBugs(),
    fetchAllFish(),
    fetchAllSeaCreatures(),
  ])
  categories.value[0].count = fossils.length
  categories.value[0].names = fossils.map(f => f.name)
  categories.value[1].count = artworks.length
  categories.value[1].names = artworks.map(a => a.name)
  categories.value[2].count = bugs.length
  categories.value[2].names = bugs.map(b => b.name)
  categories.value[3].count = fish.length + sea.length
  categories.value[3].names = [...fish, ...sea].map(f => f.name)
  await nextTick()
  buildChart()
})

// Mise à jour du graphique quand la collection change
watch(collected, buildChart)
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
        <img :src="cat.image" :alt="cat.label" class="category-img" />
        <span class="category-label">{{ cat.label }}</span>
        <span class="category-count">
          {{ cat.count !== null ? cat.count + ' items' : '…' }}
        </span>
      </RouterLink>
    </section>

    <section class="progress-section">
      <h2 class="progress-title">Museum Progress</h2>
      <div class="chart-wrapper">
        <canvas ref="chartCanvas"></canvas>
      </div>
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
  background: linear-gradient(135deg, #e4f2ec, #f9fbe7);
  border-radius: 1.5rem;
  border: 2px solid #c0e0d0;
}

.hero-title {
  font-family: 'qlarendon', serif;
  font-size: clamp(1.6rem, 5vw, 2.5rem);
  color: #6b4428;
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: #7a5434;
  max-width: 480px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  margin-top: 1.25rem;
  background-color: #89E2AE;
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
  width: clamp(140px, 22vw, 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: #fff;
  border-radius: 1.25rem;
  border: 2px solid #c0e0d0;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
  border-color: #89E2AE;
}

.category-icon {
  font-size: 2.5rem;
}

.category-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.category-label {
  font-family: 'qlarendon', serif;
  font-size: 1.2rem;
  color: #6b4428;
  font-weight: 700;
}

.category-count {
  font-size: 0.85rem;
  color: #9ecfb8;
  font-weight: 600;
}

.progress-section {
  background: #faf6ee;
  border: 2px solid #c0e0d0;
  border-radius: 1.5rem;
  padding: 1.5rem;
}

.progress-title {
  font-family: 'qlarendon', serif;
  font-size: 1.4rem;
  color: #6b4428;
  margin: 0 0 1.25rem;
  text-align: center;
}

.chart-wrapper {
  max-width: 560px;
  margin: 0 auto;
}


@media (max-width: 480px) {
  .hero {
    padding: 1.25rem 0.75rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .categories {
    gap: 0.75rem;
  }

  .category-label {
    font-size: 1rem;
  }
}
</style>
