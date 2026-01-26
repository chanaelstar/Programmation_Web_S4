<template>
  <h1>Fossils</h1>
  <div id="fossil-gallery">
    <FossilCard />
    <FossilCard />
    <FossilCard />
  </div>
</template>

<script setup></script>

<style scoped>
#fossil-gallery {
  display: flex;
  flex: wrap;
}
</style>