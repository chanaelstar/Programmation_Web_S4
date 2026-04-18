<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <p class="footer-credits">
        Data provided by
        <a href="https://api.nookipedia.com/" target="_blank" rel="noopener">Nookipedia API</a>
        · Animal Crossing: New Horizons
      </p>
      <p class="footer-copy">Chanaël Siar — IMAC S4 Web Project</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #79cdd4;
  color: #fff;
  margin-top: auto;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  text-align: center;
}

.footer-credits,
.footer-copy {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
}

.footer-credits a {
  color: rgba(255,255,255,0.85);
  text-decoration: underline;
}

.footer-credits a:hover {
  color: #fff;
}
</style>
