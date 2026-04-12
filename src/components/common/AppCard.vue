<script setup>
import { computed } from 'vue'
import { useCollection } from '@/composables/useCollection.js'

const props = defineProps({
  name: String,
  image_url: String,
  sell: Number,
  // Fossil-specific
  fossil_group: String,
  // Artwork-specific
  art_name: String,
  art_type: String,
  author: String,
  year: String,
  art_style: String,
  has_fake: Boolean,
  // Bug/fish-specific
  rarity: String
})

const { isCollected, toggleCollected } = useCollection()

const collected = computed(() => isCollected(props.name))
</script>

<template>
  <div class="app-card" :class="{ 'app-card--collected': collected }">
    <div class="app-card-image-wrapper">
      <img :src="image_url" :alt="name" class="app-card-image" />
      <span v-if="collected" class="collected-overlay">✓</span>
    </div>

    <div class="app-card-body">
      <h2 class="app-card-name">{{ name }}</h2>

      <p v-if="fossil_group" class="app-card-line">
        <strong>Group:</strong> {{ fossil_group }}
      </p>
      <p v-if="art_name" class="app-card-line">
        <strong>Real name:</strong> {{ art_name }}
      </p>
      <p v-if="art_type" class="app-card-line">
        <strong>Type:</strong> {{ art_type }}
      </p>
      <!-- <p v-if="rarity" class="app-card-line">
        <strong>Rarity:</strong> {{ rarity }}
      </p> -->
      <span v-if="has_fake" class="fake-badge">Has fake</span>

      <button class="collect-btn" @click.stop="toggleCollected(name)">
        {{ collected ? '✓ Collected' : '+ Collect' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.app-card {
  background: #fff9e6;
  border-radius: 1rem;
  border: 2px solid #c8e6c9;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: default;
}

.app-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.2);
  border-color: #4caf50;
}

.app-card--collected {
  border-color: #4caf50;
  background: #f1f8e9;
}

.app-card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #e8f5e9;
}

.app-card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.collected-overlay {
  position: absolute;
  top: 6px;
  right: 8px;
  background: #4caf50;
  color: #fff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.app-card-body {
  padding: 0.6rem 0.75rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}

.app-card-name {
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
  color: #2e7d32;
  margin: 0 0 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-card-line {
  font-size: 0.72rem;
  color: #558b2f;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fake-badge {
  display: inline-block;
  background: #ffcc02;
  color: #5d4037;
  border-radius: 0.5rem;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  margin-top: 0.1rem;
}

.collect-btn {
  margin-top: auto;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  border: 2px solid #4caf50;
  background: transparent;
  color: #2e7d32;
  font-family: 'Manrope', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  align-self: flex-start;
}

.collect-btn:hover {
  background-color: #4caf50;
  color: #fff;
}

.app-card--collected .collect-btn {
  background-color: #4caf50;
  color: #fff;
}
</style>
