<script setup>
defineProps({
  sortKey: String,
  filterKey: String,
  searchQuery: { type: String, default: '' },
  sortId: { type: String, default: 'sort' },
  filterId: { type: String, default: 'filter' },
  searchPlaceholder: { type: String, default: 'Search…' },
})

const emit = defineEmits(['update:sortKey', 'update:filterKey', 'update:searchQuery'])
</script>

<template>
  <div class="gallery-controls-wrapper">
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input
        class="search-input"
        type="text"
        :placeholder="searchPlaceholder"
        :value="searchQuery"
        @input="emit('update:searchQuery', $event.target.value)"
      />
      <button
        v-if="searchQuery"
        class="search-clear"
        @click="emit('update:searchQuery', '')"
      >✕</button>
    </div>

    <div class="gallery-controls">
      <label :for="sortId">Sort</label>
      <select
        :id="sortId"
        :value="sortKey"
        @change="emit('update:sortKey', $event.target.value)"
      >
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>

      <label :for="filterId">Filter</label>
      <select
        :id="filterId"
        :value="filterKey"
        @change="emit('update:filterKey', $event.target.value)"
      >
        <option value="all">All</option>
        <option value="collected">Collected</option>
        <option value="not-collected">Not collected</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.gallery-controls-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #b8dcc9;
  border-radius: 2rem;
  padding: 0.35rem 0.9rem;
  gap: 0.5rem;
  width: 320px;
  max-width: 100%;
  transition: border-color 0.15s;
}

.search-bar:focus-within {
  border-color: #89E2AE;
}

.search-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  color: #6b4428;
  outline: none;
  min-width: 0;
}

.search-input::placeholder { color: #b8dcc9; }

.search-clear {
  background: none;
  border: none;
  color: #b8dcc9;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
}

.search-clear:hover { color: #89E2AE; }

@media (max-width: 600px) {
  .gallery-controls-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    width: 100%;
  }
}
</style>
