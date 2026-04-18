<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCollection } from '@/composables/useCollection.js'

const props = defineProps({
  artwork: Object,
  loading: Boolean,
  error: Boolean,
})

const { isCollected, toggleCollected } = useCollection()

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox(index) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function lightboxImages() {
  const imgs = []
  if (props.artwork?.texture_url) imgs.push({ src: props.artwork.texture_url, label: 'Original' })
  if (props.artwork?.fake_texture_url) imgs.push({ src: props.artwork.fake_texture_url, label: 'Forgery' })
  return imgs
}
</script>

<template>
  <div>
    <RouterLink to="/artworks" class="back-link">← Back to Artworks</RouterLink>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
    </div>

    <p v-else-if="error" class="error-state">Artwork not found.</p>

    <div v-else class="detail-card">
      <!-- Top: images + infos -->
      <div class="detail-top">
        <div class="detail-images">
          <div class="detail-image-wrapper">
            <img :src="artwork.image_url" :alt="artwork.name" class="detail-image" />
            <span class="img-label">Real</span>
          </div>
          <div v-if="artwork.has_fake && artwork.fake_image_url" class="detail-image-wrapper fake">
            <img :src="artwork.fake_image_url" :alt="artwork.name + ' (fake)'" class="detail-image" />
            <span class="img-label fake-lbl">Fake</span>
          </div>
        </div>

        <div class="detail-info">
          <h1 class="detail-name">{{ artwork.art_name || artwork.name }}</h1>

          <div class="detail-grid">
            <div v-if="artwork.art_type" class="detail-item">
              <span class="detail-label">Type</span>
              <span class="detail-value">{{ artwork.art_type }}</span>
            </div>
            <div v-if="artwork.author" class="detail-item">
              <span class="detail-label">Artist</span>
              <span class="detail-value">{{ artwork.author }}</span>
            </div>
            <div v-if="artwork.year" class="detail-item">
              <span class="detail-label">Year</span>
              <span class="detail-value">{{ artwork.year }}</span>
            </div>
            <div v-if="artwork.art_style" class="detail-item">
              <span class="detail-label">Style</span>
              <span class="detail-value">{{ artwork.art_style }}</span>
            </div>
            <div v-if="artwork.buy" class="detail-item">
              <span class="detail-label">Buy</span>
              <span class="detail-value">{{ artwork.buy }} bells</span>
            </div>
            <div v-if="artwork.sell" class="detail-item">
              <span class="detail-label">Sell (Nook)</span>
              <span class="detail-value">{{ artwork.sell }} bells</span>
            </div>
          </div>

          <button
            class="collect-btn"
            :class="{ collected: isCollected(artwork.name) }"
            @click="toggleCollected(artwork.name)"
          >
            {{ isCollected(artwork.name) ? '✓ Collected' : '+ Add to collection' }}
          </button>
        </div>
      </div>

      <hr class="section-divider" />
      <!-- Description -->
      <div v-if="artwork.description" class="info-block genuine">
        <h2 class="info-title">✅ Original</h2>
        <div class="info-body">
          <img
            v-if="artwork.texture_url"
            :src="artwork.texture_url"
            alt="Real texture"
            class="info-texture clickable"
            @click="openLightbox(0)"
            title="Click to enlarge"
          />
          <p class="info-description">{{ artwork.description }}</p>
        </div>
      </div>

      <!-- Comment repérer le faux ? -->
      <div v-if="artwork.has_fake && artwork.authenticity" class="info-block forgery">
        <h2 class="info-title">❌ Fake </h2>
        <div class="info-body">
          <img
            v-if="artwork.fake_texture_url"
            :src="artwork.fake_texture_url"
            alt="Fake texture"
            class="info-texture clickable"
            @click="openLightbox(1)"
            title="Click to enlarge"
          />
          <p class="info-description">{{ artwork.authenticity }}</p>
        </div>
      </div>
    </div>

    <Transition name="lightbox">
      <div v-if="lightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">
        <div class="lightbox-box">
          <button class="lightbox-close" @click="closeLightbox">✕</button>

          <div class="lightbox-tabs">
            <button
              v-for="(img, i) in lightboxImages()"
              :key="i"
              class="lightbox-tab"
              :class="{ active: lightboxIndex === i }"
              @click="lightboxIndex = i"
            >{{ img.label }}</button>
          </div>

          <Transition name="slide" mode="out-in">
            <img
              :key="lightboxIndex"
              :src="lightboxImages()[lightboxIndex]?.src"
              :alt="lightboxImages()[lightboxIndex]?.label"
              class="lightbox-img"
            />
          </Transition>
        </div>
      </div>
    </Transition>
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
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-top {
  display: flex;
  gap: 2.5rem;
}

.detail-images {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-image-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  background: #e4f2ec;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-image-wrapper.fake {
  background: #fce4ec;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.img-label {
  position: absolute;
  bottom: 0.4rem;
  right: 0.5rem;
  background: #89E2AE;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
}

.fake-lbl { background: #e53935; }

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

.section-divider {
  border: none;
  border-top: 1px solid #c0e0d0;
  margin: 0;
}

.info-block {
  border-radius: 1rem;
  padding: 1.25rem;
}

.info-block.genuine { background: #eaf4ef; }
.info-block.forgery { background: #fce4ec; }

.info-title {
  font-family: 'qlarendon', serif;
  font-size: 1.1rem;
  color: #6b4428;
  margin: 0 0 0.75rem;
}

.info-block.forgery .info-title { color: #c62828; }

.info-body {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.info-texture {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 0.75rem;
  background: #fff;
  padding: 0.5rem;
}

.info-description {
  font-size: 0.9rem;
  color: #5c3d1e;
  line-height: 1.6;
  margin: 0;
}

.info-block.forgery .info-description { color: #b71c1c; }

.info-texture.clickable {
  cursor: zoom-in;
  transition: transform 0.15s, box-shadow 0.15s;
}

.info-texture.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-box {
  background: #faf6ee;
  border-radius: 1.5rem;
  padding: 1.5rem;
  max-width: 520px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.lightbox-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #9ecfb8;
  line-height: 1;
}

.lightbox-close:hover { color: #6b4428; }

.lightbox-tabs {
  display: flex;
  gap: 0.5rem;
}

.lightbox-tab {
  padding: 0.35rem 1.1rem;
  border-radius: 999px;
  border: 2px solid #89E2AE;
  background: transparent;
  color: #6b4428;
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.lightbox-tab.active {
  background: #89E2AE;
  color: #fff;
}

.lightbox-img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 1rem;
  background: #eaf4ef;
  padding: 1rem;
}

/* Transitions lightbox */
.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.2s; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: opacity 0.2s, transform 0.2s; }
.slide-enter-from { opacity: 0; transform: translateX(30px); }
.slide-leave-to { opacity: 0; transform: translateX(-30px); }

@media (max-width: 600px) {
  .detail-top { flex-direction: column; }
  .detail-images { flex-direction: row; flex-wrap: wrap; }
  .detail-image-wrapper { width: 140px; height: 140px; }
  .detail-grid { grid-template-columns: 1fr; }
  .info-body { flex-direction: column; }
  .info-texture { width: 100%; height: 160px; }
}
</style>
