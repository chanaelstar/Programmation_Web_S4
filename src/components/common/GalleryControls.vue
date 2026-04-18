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
  <input
    class="search-input"
    type="text"
    :placeholder="searchPlaceholder"
    :value="searchQuery"
    @input="emit('update:searchQuery', $event.target.value)"
  />
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
  flex-direction: column;
  gap: 0.6rem;
}

.search-input {
  padding: 0.4rem 0.9rem;
  border-radius: 1rem;
  border: 2px solid #a5d6a7;
  background: #fff;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  color: #2e7d32;
  outline: none;
  width: 220px;
  transition: border-color 0.15s;
}

.search-input:focus {
  border-color: #4caf50;
}

.search-input::placeholder {
  color: #a5d6a7;
}
</style>
