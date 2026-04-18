<script setup>
import { RouterLink } from 'vue-router'
import { useCollection } from '@/composables/useCollection.js'

const props = defineProps({
  fossil: Object,
  group: Object,
  loading: Boolean,
  error: Boolean,
})

const { isCollected, toggleCollected, isGroupComplete } = useCollection()

const otherFossils = () =>
  props.group?.fossils?.filter(f => f.name !== props.fossil?.name) ?? []

const groupFossilNames = () => props.group?.fossils?.map(f => f.name) ?? []
</script>

<template>
  <div>
    <RouterLink to="/fossils" class="back-link">← Back to Fossils</RouterLink>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <p v-else-if="error" class="error-state">Fossil not found.</p>

    <div v-else class="detail-card">
      <!-- Top: image + infos -->
      <div class="detail-top">
        <div class="detail-image-wrapper">
          <img :src="fossil.image_url" :alt="fossil.name" class="detail-image" />
        </div>

        <div class="detail-info">
          <p v-if="group" class="group-label">{{ group.name }}</p>
          <h1 class="detail-name">{{ fossil.name }}</h1>
          <div v-if="group && isGroupComplete(groupFossilNames())" class="complete-badge">
            ⭐ Squelette Complet
          </div>

          <div class="detail-grid">
            <div v-if="fossil.sell" class="detail-item">
              <span class="detail-label">Sell (Nook)</span>
              <span class="detail-value">{{ fossil.sell }} bells</span>
            </div>
          </div>

          <div v-if="fossil.catchphrases && fossil.catchphrases.length" class="catchphrase-block">
            <p class="catchphrase">« {{ fossil.catchphrases[0] }} »</p>
          </div>

          <button
            class="collect-btn"
            :class="{ collected: isCollected(fossil.name) }"
            @click="toggleCollected(fossil.name)"
          >
            {{ isCollected(fossil.name) ? '✓ Collected' : '+ Add to collection' }}
          </button>
        </div>
      </div>

      <!-- Description du groupe -->
      <div v-if="group?.description" class="group-description">
        <p>{{ group.description }}</p>
      </div>

      <!-- Autres fossiles du groupe -->
      <div v-if="otherFossils().length" class="group-section">
        <h2 class="group-section-title">🦴 Also needed to complete {{ group.name }}</h2>
        <div class="group-fossils">
          <div
            v-for="f in otherFossils()"
            :key="f.name"
            class="group-fossil-item"
            :class="{ 'is-collected': isCollected(f.name) }"
          >
            <img :src="f.image_url" :alt="f.name" class="group-fossil-img" />
            <span class="group-fossil-name">{{ f.name }}</span>
            <span v-if="isCollected(f.name)" class="collected-badge">✓</span>
          </div>
        </div>
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

.detail-card {
  background: #fff9e6;
  border-radius: 1.5rem;
  border: 2px solid #c8e6c9;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.detail-top {
  display: flex;
  gap: 2.5rem;
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
  gap: 1rem;
  flex: 1;
}

.complete-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: linear-gradient(135deg, #fff9c4, #ffe082);
  border: 2px solid #f9a825;
  color: #e65100;
  border-radius: 2rem;
  padding: 0.3rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
}

.group-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #81c784;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
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
.collect-btn.collected { background-color: #4caf50; color: #fff; }

/* Description */
.group-description {
  border-top: 1px solid #c8e6c9;
  padding-top: 1.25rem;
  font-size: 0.9rem;
  color: #558b2f;
  line-height: 1.6;
}

.group-description p { margin: 0; }

/* Autres fossiles du groupe */
.group-section {
  border-top: 1px solid #c8e6c9;
  padding-top: 1.25rem;
}

.group-section-title {
  font-family: 'qlarendon', serif;
  font-size: 1rem;
  color: #2e7d32;
  margin: 0 0 1rem;
}

.group-fossils {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.group-fossil-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  background: #f1f8e9;
  border-radius: 0.75rem;
  padding: 0.6rem;
  width: 100px;
  border: 2px solid transparent;
  transition: border-color 0.15s;
}

.group-fossil-item.is-collected {
  border-color: #4caf50;
  background: #e8f5e9;
}

.group-fossil-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.group-fossil-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: #2e7d32;
  text-align: center;
  text-transform: capitalize;
}

.collected-badge {
  position: absolute;
  top: 4px;
  right: 6px;
  background: #4caf50;
  color: #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

@media (max-width: 600px) {
  .detail-top { flex-direction: column; }
  .detail-image-wrapper { width: 100%; height: 200px; }
  .detail-grid { grid-template-columns: 1fr; }
}
</style>
