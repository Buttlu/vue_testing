<script setup lang="js">
import DonkeyCard from './DonkeyCard.vue'
import { ref, onMounted } from 'vue'
import Draggable from 'vuedraggable'

const cards = ref([]);

onMounted(() => {
  for (let i = 0; i < 20; i++) {
    for (let j = 1; j <= 5; j++) {
      cards.value.push(j);
    }
  }
});
</script>

<template>  
  <h1>Donkey World</h1>
  <!-- outputs every value in cards array
  <DonkeyCard v-for="card in cards" :key="card">
    <template #number>{{ card }}</template> 
  </DonkeyCard>
  -->
  <div class="box"></div>
  <div class="wrapper">
    <div class="area1"></div>
    <div class="area2"></div>
  </div>
</template> 

<style scoped lang="scss">
@use '../assets/base.css';
.box {
  width: 4em;
  height: 4em;
  background-color: white;
  display: inline-block;
}
.wrapper {    
  display: flex;
  justify-content:space-evenly;


  .area1, .area2 {
    width: 10em;
    height: 20em;
    margin: 2em;
  }  
  .area1{
    background-color: red;
  }
  .area2 {
    background-color: blue;
  }
}
</style>