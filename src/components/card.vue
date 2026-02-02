<template>

    <div id="fossil-card">
    <img :src="image" :alt="name" id="fossil-image" />

    <div id="fossil-description">
      <h3>{{ name }}</h3>
      
      <p class="fossil-description-line">
        <strong>Group :</strong> {{ fossil_group || 'None' }}
      </p>
      
      <p class="fossil-description-line">
        <strong>Price :</strong> {{ sell_price }} bells
      </p>
    </div>
  </div>
 
</template>

<script setup>
defineProps({
  name: String,
  image: String,
  fossil_group: String,
  sell_price: Number
});
</script>

<style scoped>
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