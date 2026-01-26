<template>
  <h1>Fossiles</h1>
  <div id="fossil-container">
  <div id="fossil-card">
    <img
      id="fossil-image"
      src="https://dodo.ac/np/images/b/b0/Fossil_NH_Icon.png"
      alt="Fossil"
    />
    <div id="fossil-description">
      <h3>Fossile</h3>
      <p className="fossil-description-line">Fossile non expertiser </p>
      <p className="fossil-description-line">Non découvert</p>
    </div>
  </div>

  <div id="fossil-card">
    <img
      id="fossil-image"
      src="https://dodo.ac/np/images/8/8f/Brachio_Skull_NH_Icon.png"
      alt="Fossil"
    />
    <div id="fossil-description">
      <h3>Crâne de brachiosaure</h3>
      <p className="fossil-description-line">Brachiosaure </p>
      <p className="fossil-description-line">Salle 2</p>
    </div>
  </div>
</div>
</template>

<script setup></script>

<style scoped>
#fossil-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#fossil-card {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
}

#fossil-image {
  width: 100%;
  height: 105px;
  object-fit: cover;
}

#fossil-description {
  padding: 10px;
  color: #000000;
}

#fossil-description h3 {
  font-size: 18px;
  margin: 0;
}

.fossil-description-line {
  color: #353535;
  font-size: 12px;
  margin: 5px 0;
}
</style>