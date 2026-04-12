<script setup>
import { RouterLink } from 'vue-router'
import { useCollection } from '@/composables/useCollection.js'

const props = defineProps({
  fish: Object,
  loading: Boolean,
  error: Boolean,
})

const { isCollected, toggleCollected } = useCollection()
</script>

<template>
  <div>
    <RouterLink to="/fish" class="back-link">← Back to Fish</RouterLink>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <p v-else-if="error" class="error-state">Fish not found.</p>

    <div v-else class="fish-detail">
      <div class="fish-detail-image-wrapper">
        <img :src="fish.image_url" :alt="fish.name" class="fish-detail-image" />
      </div>

      <div class="fish-detail-info">
        <h1 class="fish-detail-name">{{ fish.name }}</h1>

        <div class="fish-detail-grid">
          <div v-if="fish.rarity" class="detail-item">
            <span class="detail-label">Rarity</span>
            <span class="detail-value">{{ fish.rarity }}</span>
          </div>
          <div v-if="fish.sell_nook" class="detail-item">
            <span class="detail-label">Sell (Nook)</span>
            <span class="detail-value">{{ fish.sell_nook }} bells</span>
          </div>
          <div v-if="fish.sell_cj" class="detail-item">
            <span class="detail-label">Sell (C.J.)</span>
            <span class="detail-value">{{ fish.sell_cj }} bells</span>
          </div>
          <div v-if="fish.location" class="detail-item">
            <span class="detail-label">Location</span>
            <span class="detail-value">{{ fish.location }}</span>
          </div>
          <div v-if="fish.shadow_size" class="detail-item">
            <span class="detail-label">Shadow size</span>
            <span class="detail-value">{{ fish.shadow_size }}</span>
          </div>
          <div v-if="fish.difficulty" class="detail-item">
            <span class="detail-label">Difficulty</span>
            <span class="detail-value">{{ fish.difficulty }}</span>
          </div>
        </div>

        <!-- <div v-if="fish.north" class="fish-detail-availability">
          <h2 class="section-title">🌍 Northern hemisphere</h2>
          <p class="months-text">{{ fish.north.months || 'Year-round' }}</p>
        </div>
        <div v-if="fish.south" class="fish-detail-availability">
          <h2 class="section-title">🌏 Southern hemisphere</h2>
          <p class="months-text">{{ fish.south.months || 'Year-round' }}</p>
        </div> -->

        <div v-if="fish.catchphrases && fish.catchphrases.length" class="fish-detail-catchphrase">
          <p class="catchphrase">« {{ fish.catchphrases[0] }} »</p>
        </div>

        <button
          class="collect-btn"
          :class="{ collected: isCollected(fish.name) }"
          @click="toggleCollected(fish.name)"
        >
          {{ isCollected(fish.name) ? '✓ Collected' : '+ Add to collection' }}
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

.fish-detail {
  display: flex;
  gap: 2.5rem;
  background: #fff9e6;
  border-radius: 1.5rem;
  border: 2px solid #c8e6c9;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.fish-detail-image-wrapper {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  background: #e8f5e9;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fish-detail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.fish-detail-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
}

.fish-detail-name {
  font-family: 'qlarendon', serif;
  font-size: 2rem;
  color: #2e7d32;
  text-transform: capitalize;
  margin: 0;
}

.fish-detail-grid {
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
  .fish-detail { flex-direction: column; }
  .fish-detail-image-wrapper { width: 100%; height: 200px; }
  .fish-detail-grid { grid-template-columns: 1fr; }
}
</style>
