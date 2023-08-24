<script setup lang="ts">
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'

let players = ref([] as string[]);
let player = ref('');
const emit = defineEmits(['send-players']);

onMounted(() => {
  let savedPlayers = localStorage.getItem('save_players');
  if (savedPlayers != null) players.value = JSON.parse(savedPlayers);
  console.log(`players: ${players.value} ; savedPlayers: ${savedPlayers}`);
  localStorage.removeItem('save_players');
})

function sendPlayers() {
  emit('send-players', players.value);
}
//setting up the list to show the players 
function addPlayers() {
  if (player.value == "" || player.value == null) return;
  players.value.push(player.value);
  player.value = "";
}
</script>

<template>
  <div class="setPlayers">
    <h1>Add players</h1>
    <div class="addPlayer">
      <input type="text" v-model="player" placeholder="Player name">
      <button @click="addPlayers()">Add player</button>
      <br><button @click="sendPlayers()" >Start Game</button>
    </div>
    <div class="showPlayers">
      <draggable v-model="players" tag="ul" group="players" :animation="300" item-key="p">
        <template #item="{ element: p }">
          <li>{{ p }}</li>
        </template>
      </draggable>
    </div>
    <div class="rulesbox"></div>
  </div>    
</template>