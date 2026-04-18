import { ref } from 'vue'

const STORAGE_KEY = 'acnh-collection'

const collected = ref(new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')))

function isCollected(name) {
  return collected.value.has(name)
}

function toggleCollected(name) {
  const updated = new Set(collected.value)
  if (updated.has(name)) {
    updated.delete(name)
  } else {
    updated.add(name)
  }
  collected.value = updated
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]))
}

// names = tableau de noms de fossiles du même groupe
function isGroupComplete(names) {
  if (!names || names.length === 0) return false
  return names.every(name => collected.value.has(name))
}

export function useCollection() {
  return { collected, isCollected, toggleCollected, isGroupComplete }
}
