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
    <div class="playerbox">
      <h2>Add players</h2>
      <div class="addPlayer">
        <input type="text" v-model="player" placeholder="Player name">
        <button @click="addPlayers()" id="add">Add player</button>
      </div>
      <div class="showPlayers">
        <h2>Current players</h2>
        <draggable v-model="players" tag="ul" group="players" :animation="300" item-key="p">
          <template #item="{ element: p }">
            <li>{{ p }}</li>
          </template>
        </draggable>
      </div>
      <button @click="sendPlayers()" id="send">Start Game</button>
    </div>
    <div class="rulesbox">
      <h2>Rules and how to play</h2>
      <p>
        In 10'00 you throw up to 6 dice with the goal of getting <em>exactly</em> 10'000 points. If any dice gives points, 
        that/ those dice are removed and only given back if all 6 dice are used without the players losing that turn.
        If all 6 dice haven given points then the player can roll all 6 again.
      </p>
      <p>
        Points are given through: straight (1 - 6), 3 pairs, triples, and singular 1s and 5s. Strights give 1500 points. 
        3 pairs gives 500 points. Triples gives 100 * the number on the dice and doubled if more than 3 dice
        (a triplet of 4 gives 400 points, quadruple of 4 gives 800 points, quintuple of 4 gives 1600 points, etc, exception for triplet of 1s which give 1000 points).
        1s and 5s that don't go to any of the categories above give 100 and 50 points respcetivly.
      </p>
      <p>
        The first time you claim points you need 1000 points or more. Afterwards any amount can be claimed.
        If the total score goes above 10'000, the that turn isn't counted.
      </p>
      <p>
        If a dicethrow doesn't yeild any points, then the players that threw fails that turn and it goes to the next player.
      </p>
    </div>
  </div>    
</template>

<style scoped lang=scss>
@use '../assets/base.css';
h2 {
  text-decoration: underline;
}
p {
  margin-bottom: .6em;
}
.setPlayers {
  display: flex;
  justify-content: space-evenly;
  overflow-y: hidden;  
  max-height: 85%;
}
.playerbox, .rulesbox {
  background-color: var(--color-background-soft);
  width: 40%;
  margin-top: 2em;
  height: 90%;
  border-radius: 20px;
  border: 2px solid var(--color-border);
  padding: .7em;
}
.playerbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
  h2 {
    width: 100%;
    margin-bottom: .5em;
  }
  .addPlayer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    input {
      width: 62%;
      padding-left: 3%;
      height: 3em;
      margin-bottom: 0;
      margin-left: 5%;
      display: inline-block;
      border-radius: 10px 0 0 10px;
      border: none;
    }
    #add {
      border: none;
      border-left: 2px dashed var(--color-border);
      opacity: 90%;
      display: inline-block;
      background-color: var(--vt-c-white-mute);
      width: 25%;
      margin-top: 0;
      height: 3em;
      padding: 0;
      margin-right: 5%;
      border-radius: 0 10px 10px 0;
    }    
  }
  #send {
    border: none; 
    background-color: var(--vt-c-white-mute);
    width: 100%;
    height: 7em;
    position: absolute;
    bottom: 0;
    border-radius: 0px 0px 20px 20px;
  }
  li {list-style-type: none;}
}
.rulesbox {
  overflow-y: scroll;
  border-radius: 20px 0px 0 20px;
}
</style>