<script setup lang="ts">
import { ref, onUpdated, onMounted } from 'vue'
// @ts-ignore
import { currentPlayer } from '../assets/cPlayer.js'

const props = defineProps(['recieved_players', 'current_player']);

const players = ref(props['recieved_players']);
const playerCount: number = players.value.length;
//const currentPlayer = ref(props['current_player']);

onUpdated(() => {
  const scoreLists: NodeListOf<Element> = document.querySelectorAll('.score');
  scoreLists.forEach(scoreList => {
    let top = scoreList.scrollHeight;
    scoreList.scrollTo({
      top: top,
      left: 0,
      behavior: 'smooth'
    })
  });
})

onMounted(() => {
  //console.log(players.value);
  console.log(currentPlayer.current);
  //console.log(players.value[currentPlayer.current]);
});

function oneColumn(): boolean {
  const minWidth = 900;
  window.outerWidth > minWidth? document.documentElement.style.setProperty("--height", "82%") 
                                : document.documentElement.style.setProperty("--height", "70%");
  return window.outerWidth > minWidth;
}

function calcPoints(p: number[]): number {
  return p.reduce((total: any, num: any) => total + num, 0);
}

</script>

<template>
  <template v-if="oneColumn()">
    <div class="list-wrapper" v-for="p in players" :key="p">
      <div class="head">{{ p.name }}</div>
      <div class="score">
        <ul>
          <li v-for="s in p.scores" :key="s">
            <span>{{ s }}</span>
          </li>
        </ul>
      </div>
      <div class="remaining-score">
        Needed: {{ 10000 - calcPoints(p.scores) }}
      </div>
      <div class="total-score" :class="{ 'won': calcPoints(p.scores) == 10000 }">
        Total: {{ calcPoints(p.scores) }}
      </div>
    </div>
  </template>

  <template v-if="!oneColumn()">
    <div class="list-wrapper">
      <div class="head">{{ players[currentPlayer.current].name }}</div>
      <div class="score">
        <ul>
          <li v-for="s in players[currentPlayer.current].scores" :key="s">
            <span>{{ s }}</span>
          </li>
        </ul>
      </div>
      <div class="remaining-score">
        Needed: {{ 10000 - calcPoints(players[currentPlayer.current].scores) }}
      </div>
      <div class="total-score" :class="{ 'won': calcPoints(players[currentPlayer.current].scores) == 10000 }">
        Total: {{ calcPoints(players[currentPlayer.current].scores) }}
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
@use '../assets/base.css';
:root {
  --height: 82%;
}
.list-wrapper {
  width: 100%;
  position: relative;
  border-bottom: .2em solid var(--color-border);
  height: 100%;
  
  &:last-of-type {
    border-right: .2em solid var(--color-border);
  }

  &:first-of-type {
    border-left: .2em solid var(--color-border);
  }

  + .list-wrapper {
    border-left: .2em solid var(--color-border);
  }

  ul {
    padding: 0;
  }
  
  li {
    list-style-type: none;
    padding: 0 1em;
    width: 100%;
    text-align: center;

    + li {
      border-top: .15em solid var(--color-border);
    }
  }
  li:last-of-type {
    border-bottom: .06em solid var(--color-border);
  }
  
  .head {
    text-align: center;
    font-weight: bold;
    border-bottom: .3em solid var(--color-border);
  }
  .current {
    background-color: var(--vt-c-green);
  }

  .score {    
    height: var(--height);
    max-height: var(--height);
    min-height: var(--height);
    /*width: calc((100%/v-bind(playerCount)));*/
    width: 100%;    
    overflow-y: auto;
    scrollbar-gutter: stable;
    scroll-snap-type: y mandatory;
    scroll-snap-align: top;
    text-align: end;
    font-style: italic;
  }

  .score::-webkit-scrollbar {
    display: none;    
  }

  
  .total-score, .remaining-score {
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
    border-top: .2em solid var(--color-border);
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .won {
    color: var(--vt-c-green);
  }
  .remaining-score {
    bottom: 2.2em;
    font-size: 10pt;
    border-top: .3em solid var(--color-border);
  }
}
</style>