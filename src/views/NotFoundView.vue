<template>
  <div class="not-found">
    <div class="not-found-card">
      <p class="not-found-emoji">🦴</p>
      <h1 class="not-found-title">404</h1>
      <p class="not-found-subtitle">Blathers couldn't find this page…</p>
      <RouterLink to="/" class="back-link">← Back to the Museum</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.not-found-card {
  text-align: center;
  background: #fff9e6;
  border: 2px solid #c8e6c9;
  border-radius: 1.5rem;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.not-found-emoji {
  font-size: 3rem;
  margin: 0;
}

.not-found-title {
  font-family: 'qlarendon', serif;
  font-size: 4rem;
  color: #2e7d32;
  margin: 0;
}

.not-found-subtitle {
  color: #558b2f;
  font-size: 1.05rem;
  margin: 0;
}

.back-link {
  margin-top: 0.5rem;
  color: #4caf50;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
}

.back-link:hover { color: #2e7d32; }
</style>
