<script setup lang="ts">
import { ref } from 'vue'
import TenkDice from '../components/TenkDice.vue'
import TenkScore from '../components/TenkScore.vue'
import TenkPlayers from '../components/TenkRegisterPlayers.vue'
import TenkDone from '../components/TenkDone.vue'
// @ts-ignore
import { currentPlayer } from '../assets/cPlayer.js'

const players = ref([] as object[]);
const finishedPlayers = ref([] as number[]);
const finishedPlayersSend = ref([] as object[]);
const playerCount = ref(0);
const setupPlayers = ref(false);
const contd = ref(false);
const playedScore = ref(0);
//const currentPlayer = ref(0);
const over = ref(false);
const gameover = ref(false);


function recievedPlayers(sent_players: string[]) {
  setupPlayers.value = true;
  playerCount.value = sent_players.length;
  let i = 0;
  sent_players.forEach(x => {
    const obj = ref({
      name: x, 
      scores: [] as number[],
      isIn: false,
      currentlyPlaying: false,
      pos: i%playerCount.value
    });
    players.value.push(obj.value);
    i++;
  });
};

function gotScore(score: number) {  
  playedScore.value = score;
  contd.value = true;
  if (score > 0) {
    // @ts-ignore
    const totalScore = players.value[currentPlayer.current].scores.reduce((total: any, num: any) => total + num, 0) + score;
    if (totalScore > 10000) {
      tooManyPoints();
      return;
    } else if (totalScore == 10000) {
      finishedPlayers.value.push(currentPlayer.current);
    }
    // @ts-ignore
    players.value[currentPlayer.current].scores.push(score);
    // @ts-ignore
    players.value[currentPlayer.current].isIn = true;
  }
  nextPlayer();
}

function nextPlayer() {
  if (playerCount.value - finishedPlayers.value.length == 1) {
    endGame();
    return;
  }
  currentPlayer.current = (currentPlayer.current+1) % playerCount.value;
  if (finishedPlayers.value.includes(currentPlayer.current)) {
    nextPlayer();
  }
}

function endGame() {
  //add the last player
  for (let i = 0; i < playerCount.value; i++) {
    if (!finishedPlayers.value.includes(i)) {
      finishedPlayers.value.push(i);
    }
  }
  for (let player in finishedPlayers.value) {
    // @ts-ignore
    finishedPlayersSend.value.push(players.value.find(x => x.pos == player) as object);    
  }
  finishedPlayersSend.value = sortFinishedPlayers(players.value, finishedPlayers.value);
  gameover.value = true;
}

function sortFinishedPlayers(array: object[], sortArray: number[]): object[] {  
  return [...array].sort(
    // @ts-ignore
    (a, b) => sortArray.indexOf(a.pos) - sortArray.indexOf(b.pos)
  )
}

function tooManyPoints() {
  over.value = true;
  setTimeout(() => {
    over.value = false;
  }, 2000);
  nextPlayer();
}

</script>

<template>
  <TenkPlayers v-if="!setupPlayers" class="TenkPlayers" @send-players="recievedPlayers"/>
  <div id="banner" v-if="!gameover">
    <!-- @vue-skip -->
    <div class="current-player" v-if="setupPlayers && !gameover"> 
      <span class="name">Currently playing</span>
      <span class="player" v-if="!over">{{ players[currentPlayer.current].name }}</span>
      <span class="player" v-if="over">Too many points, you need EXACTLY 10'000 points</span>
      
    </div>
  </div>
  <div class="wrapper" v-if="!gameover">
    <div class="score-wrapper">
      <TenkScore :recieved_players="players" :current_player="currentPlayer.current" v-if="setupPlayers && !gameover"/>
    </div>
    <div class="dice-wrapper" v-if="setupPlayers && !gameover">
      <TenkDice :player_status="playerCount" @send-score="gotScore" />
    </div>
  </div>
  <TenkDone :scoreboard="finishedPlayersSend" class="game-over TenkPlayers" v-if="gameover"/>
</template>

<style scoped lang="scss">
@use '../assets/base.css';
#banner {
  width: 100%;
  height: 4.5em;
  background-color: var(--color-background-soft);
  border-bottom: .2em solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    width: 50%;
    text-align: center;
  }
  .current-player {

    > * {
      display: block;
    }
    .player {
      font-size: 18pt;
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 80vw;
  > * {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;    
  }
}
.TenkPlayers {
  background-color: var(--color-background);
  width: 100%;
  height: 100%;
  z-index: 99;
  position: absolute;
}
.dice-wrapper {
  margin-left: 5em;
}
.score-wrapper {
  flex-direction: row;
}
</style>