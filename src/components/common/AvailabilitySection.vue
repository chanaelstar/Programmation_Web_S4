<script setup>
const props = defineProps({
  north: Array,
  south: Array,
})

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function parseActiveMonths(monthsStr) {
  if (!monthsStr) return Array(12).fill(false)
  const str = monthsStr.trim()
  if (str === 'Year-round' || str === 'All year' || str === '') return Array(12).fill(true)

  const parts = str.split(/\s*[-–—]\s*/)
  const startIdx = MONTHS.indexOf(parts[0]?.trim())
  const endIdx = parts[1] ? MONTHS.indexOf(parts[1]?.trim()) : startIdx

  if (startIdx === -1) return Array(12).fill(false)

  return MONTHS.map((_, i) => {
    if (startIdx <= endIdx) return i >= startIdx && i <= endIdx
    return i >= startIdx || i <= endIdx // wrap around (e.g. Dec - Mar)
  })
}

function getActiveMonths(entries) {
  if (!entries || entries.length === 0) return Array(12).fill(true)
  const combined = Array(12).fill(false)
  for (const entry of entries) {
    const active = parseActiveMonths(entry.months)
    active.forEach((v, i) => { if (v) combined[i] = true })
  }
  return combined
}

function getTime(entries) {
  if (!entries || entries.length === 0) return null
  return entries.map(e => e.time).filter(Boolean).join(' / ')
}
</script>

<template>
  <div class="availability-section">
    <div class="hemi-block" v-for="(hemi, hi) in [
      { label: '🌍 Northern Hemisphere', entries: north },
      { label: '🌏 Southern Hemisphere', entries: south },
    ]" :key="hi">
      <h2 class="hemi-title">{{ hemi.label }}</h2>

      <div class="month-bar">
        <div
          v-for="(month, i) in MONTHS"
          :key="month"
          class="month-cell"
          :class="{ active: getActiveMonths(hemi.entries)[i] }"
        >
          <span class="month-label">{{ month.slice(0, 1) }}</span>
        </div>
      </div>

      <div class="avail-meta">
        <span class="avail-months-text">
          {{ hemi.entries?.length ? hemi.entries.map(e => e.months).join(', ') : 'Year-round' }}
        </span>
        <span v-if="getTime(hemi.entries)" class="avail-time">⏰ {{ getTime(hemi.entries) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.availability-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-top: 1px solid #c0e0d0;
  padding-top: 1.5rem;
}

.hemi-block {
  background: #eaf4ef;
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.hemi-title {
  font-family: 'qlarendon', serif;
  font-size: 0.95rem;
  color: #6b4428;
  margin: 0;
}

.month-bar {
  display: flex;
  gap: 3px;
}

.month-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.month-cell::before {
  content: '';
  display: block;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #c5d9c5;
  transition: background 0.15s;
}

.month-cell.active::before {
  background: #79cdd4;
}

.month-label {
  font-size: 0.55rem;
  font-weight: 700;
  color: #9ecfb8;
  text-transform: uppercase;
}

.month-cell.active .month-label {
  color: #6b4428;
}

.avail-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.avail-months-text {
  font-size: 0.8rem;
  font-weight: 700;
  color: #6b4428;
}

.avail-time {
  font-size: 0.8rem;
  color: #7a5434;
  font-weight: 500;
}

@media (max-width: 600px) {
  .availability-section { grid-template-columns: 1fr; }
}

@media (max-width: 400px) {
  .month-label { display: none; }
}
</style>
