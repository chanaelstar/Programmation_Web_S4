<script setup>
import { RouterLink } from 'vue-router'
import { useCollection } from '@/composables/useCollection.js'

const props = defineProps({
  creature: Object,
  loading: Boolean,
  error: Boolean,
})

const { isCollected, toggleCollected } = useCollection()
</script>

<template>
  <div>
    <RouterLink to="/fish" class="back-link">← Back to Fish & Sea Creatures</RouterLink>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <p v-else-if="error" class="error-state">Sea creature not found.</p>

    <div v-else class="detail">
      <div class="detail-image-wrapper">
        <img :src="creature.image_url" :alt="creature.name" class="detail-image" />
      </div>

      <div class="detail-info">
        <h1 class="detail-name">{{ creature.name }}</h1>

        <div class="detail-grid">
          <div v-if="creature.rarity" class="detail-item">
            <span class="detail-label">Rarity</span>
            <span class="detail-value">{{ creature.rarity }}</span>
          </div>
          <div v-if="creature.sell_nook" class="detail-item">
            <span class="detail-label">Sell (Nook)</span>
            <span class="detail-value">{{ creature.sell_nook }} bells</span>
          </div>
          <div v-if="creature.shadow_size" class="detail-item">
            <span class="detail-label">Shadow size</span>
            <span class="detail-value">{{ creature.shadow_size }}</span>
          </div>
          <div v-if="creature.shadow_movement" class="detail-item">
            <span class="detail-label">Shadow movement</span>
            <span class="detail-value">{{ creature.shadow_movement }}</span>
          </div>
          <div v-if="creature.speed" class="detail-item">
            <span class="detail-label">Speed</span>
            <span class="detail-value">{{ creature.speed }}</span>
          </div>
        </div>

        <div v-if="creature.catchphrases && creature.catchphrases.length" class="detail-catchphrase">
          <p class="catchphrase">« {{ creature.catchphrases[0] }} »</p>
        </div>

        <button
          class="collect-btn"
          :class="{ collected: isCollected(creature.name) }"
          @click="toggleCollected(creature.name)"
        >
          {{ isCollected(creature.name) ? '✓ Collected' : '+ Add to collection' }}
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

.back-link:hover { color: #2e7d32; }

.error-state {
  text-align: center;
  color: #81c784;
  margin-top: 2rem;
}

.detail {
  display: flex;
  gap: 2.5rem;
  background: #fff9e6;
  border-radius: 1.5rem;
  border: 2px solid #c8e6c9;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.detail-image-wrapper {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  background: #e8f5e9;
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
  font-family: 'qlarendon', serif;
  font-size: 2rem;
  color: #2e7d32;
  text-transform: capitalize;
  margin: 0;
}

.detail-grid {
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
  .detail { flex-direction: column; }
  .detail-image-wrapper { width: 100%; height: 200px; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
