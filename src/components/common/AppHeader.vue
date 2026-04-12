<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/fossils', label: 'Fossils' },
  { path: '/artworks', label: 'Artworks' },
  { path: '/bugs', label: 'Bugs' },
  { path: '/fish', label: 'Fish' },
]
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="header-logo">
        <span class="logo-icon">🍃</span>
        <span class="logo-title">ACNH Museum</span>
      </RouterLink>

      <nav class="header-nav" :class="{ open: menuOpen }">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #4caf50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.6rem;
}

.logo-title {
  font-family: 'qlarendon', serif;
  font-size: 1.4rem;
  color: #fff;
  font-weight: bold;
  letter-spacing: 0.02em;
}

.header-nav {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border-radius: 2rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.35);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: opacity 0.2s;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .header-nav {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: #43a047;
    flex-direction: column;
    padding: 0.75rem 1rem;
    gap: 0.25rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .header-nav.open {
    display: flex;
  }

  .nav-link {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
}
</style>
