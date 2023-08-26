<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps(['scoreboard']);
const players = ref(props['scoreboard']);

onMounted(() => {
  console.log('hello there');
  console.log(players.value);
})

function savePlayers(savePlayers: boolean) {  
  if (savePlayers) {
    let playerNames: string[] = [];
    // @ts-ignore
    players.value.forEach(x => {
      playerNames.push(x.name);
    });
    localStorage.setItem('save_players', JSON.stringify(playerNames));
  }
  window.location.reload();
}

</script>

<template>
  <h1>Final Scoreboard</h1>
  <div class="leaderboard">
    <ol>
      <li v-for="p in players" :key="p">
        {{ p.name }} &nbsp;({{ p.scores.length }} throws)
      </li>
    </ol>
  </div>
  <div class="play-again">
    <h3>Play again?</h3>
    <div class="pa-buttons">
      <button @click="savePlayers(true)">Same Players</button>
      <button @click="savePlayers(false)">New Players</button>
    </div>
  </div>
</template>

<style lang="scss">
@use '../assets/base.css';
</style>