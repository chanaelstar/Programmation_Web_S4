<script setup>
import { RouterLink } from 'vue-router'
import { useCollection } from '@/composables/useCollection.js'
import AvailabilitySection from '@/components/common/AvailabilitySection.vue'

const props = defineProps({
  bug: Object,
  loading: Boolean,
  error: Boolean,
})

const { isCollected, toggleCollected } = useCollection()
</script>

<template>
  <div>
    <RouterLink to="/bugs" class="back-link">← Back to Bugs</RouterLink>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <p v-else-if="error" class="error-state">Bug not found.</p>

    <div v-else class="detail-card">
      <!-- Top: image + info -->
      <div class="detail-top">
        <div class="detail-image-wrapper">
          <img
            :src="bug.render_url || bug.image_url"
            :alt="bug.name"
            class="detail-image"
          />
        </div>

        <div class="detail-info">
          <h1 class="detail-name">{{ bug.name }}</h1>

          <div class="detail-grid">
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

          <div v-if="bug.catchphrases && bug.catchphrases.length" class="catchphrase-block">
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

      <!-- Bottom: hemisphere availability -->
      <AvailabilitySection :north="bug.availability_north" :south="bug.availability_south" />
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #89E2AE;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: color 0.15s;
}

.back-link:hover { color: #6b4428; }

.error-state {
  text-align: center;
  color: #9ecfb8;
  margin-top: 2rem;
}

.detail-card {
  background: #faf6ee;
  border-radius: 1.5rem;
  border: 2px solid #c0e0d0;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-top {
  display: flex;
  gap: 2.5rem;
}

.detail-image-wrapper {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  background: #e4f2ec;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
}

.detail-name {
  font-family: 'Manrope', sans-serif;
  font-size: 2rem;
  color: #6b4428;
  text-transform: capitalize;
  margin: 0;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.detail-item {
  background: #eaf4ef;
  border-radius: 0.75rem;
  padding: 0.6rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.detail-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #9ecfb8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b4428;
  text-transform: capitalize;
}

.catchphrase-block { margin: 0; }

.catchphrase {
  font-style: italic;
  color: #9ecfb8;
  font-size: 0.9rem;
  margin: 0;
}

.collect-btn {
  align-self: flex-start;
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  border: 2px solid #89E2AE;
  background: transparent;
  color: #6b4428;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  margin-top: auto;
}

.collect-btn:hover,
.collect-btn.collected {
  background-color: #89E2AE;
  color: #fff;
}

@media (max-width: 600px) {
  .detail-card { padding: 1.25rem; gap: 1.25rem; }
  .detail-top { flex-direction: column; gap: 1.25rem; }
  .detail-image-wrapper { width: 100%; height: 200px; }
  .detail-name { font-size: 1.5rem; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
