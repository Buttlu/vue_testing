<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const props = defineProps(['recieved_players']);

const players = ref(props['recieved_players']);
const playerCount: number = players.value.length;

onUpdated(() => {
  const scoreLists = document.querySelectorAll('.score') as NodeListOf<Element>;
  scoreLists.forEach(scoreList => {
    let top = scoreList.scrollHeight;
    scoreList.scrollTo({
      top: top,
      left: 0,
      behavior: 'smooth'
    })
  });
})

function calcPoints(p: number[]): number {
  return p.reduce((total: any, num: any) => total + num, 0);
}

</script>

<template>
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

<style scoped lang="scss">
@use '../assets/base.css';
.list-wrapper {
  width: calc((100%/v-bind(playerCount)));
  position: relative;
  border-bottom: .2em solid var(--color-border);
  height: 100%;
  
  + .list-wrapper {
    border-left: .2em solid var(--color-border);
  }

  ul {
    padding: 0;
  }
  
  li {
    list-style-type: none;
    padding: 0 1em;

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
    $height: 25em;
    height: $height;
    max-height: $height;
    min-height: $height;
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

.list-wrapper:last-of-type {
  border-right: .2em solid var(--color-border);
}

.list-wrapper:first-of-type {
  border-left: .2em solid var(--color-border);
}
</style>