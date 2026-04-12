<script setup>
import { watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { useCollection } from '@/composables/useCollection.js'

const props = defineProps({
  bug: Object,
  loading: Boolean,
  error: Boolean,
})

const { isCollected, toggleCollected } = useCollection()

watchEffect(() => {
  if (props.bug) {
    console.log('bug.rarity:', props.bug.rarity)
    console.log('bug.north:', props.bug.north)
    console.log('bug.south:', props.bug.south)
  }
})
</script>

<template>
  <div>
    <RouterLink to="/bugs" class="back-link">← Back to Bugs</RouterLink>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <p v-else-if="error" class="error-state">Bug not found.</p>

    <div v-else class="bug-detail">
      <div class="bug-detail-image-wrapper">
        <img :src="bug.image_url" :alt="bug.name" class="bug-detail-image" />
      </div>

      <div class="bug-detail-info">
        <h1 class="bug-detail-name">{{ bug.name }}</h1>

        <div class="bug-detail-grid">
          <div v-if="bug.rarity" class="detail-item">
            <span class="detail-label">Rarity</span>
            <span class="detail-value">{{ bug.rarity }}</span>
          </div>
          <div v-if="bug.sell_nook" class="detail-item">
            <span class="detail-label">Sell (Nook)</span>
            <span class="detail-value">{{ bug.sell_nook }} bells</span>
          </div>
          <div v-if="bug.sell_flick" class="detail-item">
            <span class="detail-label">Sell (Flick)</span>
            <span class="detail-value">{{ bug.sell_flick }} bells</span>
          </div>
          <div v-if="bug.location" class="detail-item">
            <span class="detail-label">Location</span>
            <span class="detail-value">{{ bug.location }}</span>
          </div>
          <div v-if="bug.weather" class="detail-item">
            <span class="detail-label">Weather</span>
            <span class="detail-value">{{ bug.weather }}</span>
          </div>
        </div>

        <!-- <div v-if="bug.north" class="bug-detail-availability">
          <h2 class="section-title">🌍 Northern hemisphere</h2>
          <p class="months-text">{{ bug.north.months || 'Year-round' }}</p>
        </div>
        <div v-if="bug.south" class="bug-detail-availability">
          <h2 class="section-title">🌏 Southern hemisphere</h2>
          <p class="months-text">{{ bug.south.months || 'Year-round' }}</p>
        </div> -->

        <div v-if="bug.catchphrases && bug.catchphrases.length" class="bug-detail-catchphrase">
          <p class="catchphrase">« {{ bug.catchphrases[0] }} »</p>
        </div>

        <button
          class="collect-btn"
          :class="{ collected: isCollected(bug.name) }"
          @click="toggleCollected(bug.name)"
        >
          {{ isCollected(bug.name) ? '✓ Collected' : '+ Add to collection' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: color 0.15s;
}

.back-link:hover {
  color: #2e7d32;
}

.error-state {
  text-align: center;
  color: #81c784;
  margin-top: 2rem;
}

.bug-detail {
  display: flex;
  gap: 2.5rem;
  background: #fff9e6;
  border-radius: 1.5rem;
  border: 2px solid #c8e6c9;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.bug-detail-image-wrapper {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  background: #e8f5e9;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bug-detail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.bug-detail-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
}

.bug-detail-name {
  font-family: 'qlarendon', serif;
  font-size: 2rem;
  color: #2e7d32;
  text-transform: capitalize;
  margin: 0;
}

.bug-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.detail-item {
  background: #f1f8e9;
  border-radius: 0.75rem;
  padding: 0.6rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.detail-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #81c784;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2e7d32;
  text-transform: capitalize;
}

/* .section-title {
  font-family: 'qlarendon', serif;
  font-size: 1rem;
  color: #2e7d32;
  margin: 0 0 0.5rem;
} */

.months-text {
  font-size: 0.9rem;
  color: #558b2f;
  font-weight: 600;
  margin: 0;
}

.catchphrase {
  font-style: italic;
  color: #81c784;
  font-size: 0.9rem;
  margin: 0;
}

.collect-btn {
  align-self: flex-start;
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  border: 2px solid #4caf50;
  background: transparent;
  color: #2e7d32;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  margin-top: auto;
}

.collect-btn:hover,
.collect-btn.collected {
  background-color: #4caf50;
  color: #fff;
}

@media (max-width: 600px) {
  .bug-detail { flex-direction: column; }
  .bug-detail-image-wrapper { width: 100%; height: 200px; }
  .bug-detail-grid { grid-template-columns: 1fr; }
}
</style>
