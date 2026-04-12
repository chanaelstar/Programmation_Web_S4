<script setup>
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style>
@font-face {
  font-family: 'Manrope';
  src: url('./assets/fonts/Manrope/Manrope-Regular.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'Manrope';
  src: url('./assets/fonts/Manrope/Manrope-Medium.ttf') format('truetype');
  font-weight: 500;
}
@font-face {
  font-family: 'Manrope';
  src: url('./assets/fonts/Manrope/Manrope-SemiBold.ttf') format('truetype');
  font-weight: 600;
}
@font-face {
  font-family: 'Manrope';
  src: url('./assets/fonts/Manrope/Manrope-Bold.ttf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family: 'qlarendon';
  src: url('./assets/fonts/qlarendon/qlarendon.otf') format('opentype');
  font-weight: 400;
}
@font-face {
  font-family: 'qlarendon';
  src: url('./assets/fonts/qlarendon/qlarendon bold.otf') format('opentype');
  font-weight: 700;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  font-family: 'Manrope', sans-serif;
  background-color: #f1f8e9;
  color: #33691e;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Card list transitions */
.card-move,
.card-enter-active,
.card-leave-active {
  transition: all 0.35s ease;
}
.card-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.card-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
.card-leave-active {
  position: absolute;
}

/* Shared gallery styles */
.gallery-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.gallery-title {
  font-family: 'qlarendon', serif;
  font-size: 1.8rem;
  color: #2e7d32;
}

.gallery-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.gallery-controls label {
  font-weight: 600;
  font-size: 0.9rem;
}

.gallery-controls select {
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  border: 2px solid #a5d6a7;
  background: #fff;
  color: #33691e;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.gallery-controls select:focus {
  border-color: #4caf50;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.25rem;
  position: relative;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #c8e6c9;
  border-top-color: #4caf50;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .app-main {
    padding: 1.25rem 1rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
  }
}
</style>
