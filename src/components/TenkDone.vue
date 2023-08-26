<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['scoreboard']);
const players = ref(props['scoreboard']);

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
  <div class="container">
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
  </div>
</template>

<style scoped lang="scss">
@use '../assets/base.css';
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: hidden;
  width: 50%;
  height: 50%;
}
h1 {
  font-size: 24pt;
}
li {
  font-size: 18pt;
}
.play-again {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  button {
    margin: 1em 1em;
    width: 14em;
    height: 5em;
    border-radius: 10px;
    border: 2px solid var(--color-border);
    opacity: 80%;
    font-weight: bold;    
  }
  button:hover {
    cursor: pointer;
  }
}
</style>