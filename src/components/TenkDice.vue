<script setup lang="ts">
import { ref, onMounted } from 'vue'

const d1 = ref({
  name: 'd-1',
  n_value: 1,
  num: 6,
  reroll: true
});
const d2 = ref({
  name: 'd-2',
  n_value: 2,
  num: 6,
  reroll: true
});
const d3 = ref({
  name: 'd-3',
  n_value: 3,
  num: 6,
  reroll: true
});
const d4 = ref({
  name: 'd-4',
  n_value: 4,
  num: 6,
  reroll: true
});
const d5 = ref({
  name: 'd-5',
  n_value: 5,
  num: 6,
  reroll: true
});
const d6 = ref({
  name: 'd-6',
  n_value: 6,
  num: 6,
  reroll: true
});
const dice = ref(
  [d1, d2, d3, d4, d5, d6]
);

const fail = ref(false);
const score = ref(0);
const remove1 = ref(false);
const remove5 = ref(false);
const resetScore = ref(false);
const errorMsg = ref('');
const disableButton = ref(false);

const emit = defineEmits(['send-score']);
const props = defineProps(['player_status']);
const playerCount = ref(props['player_status']);
let turns = ref(0);

onMounted(() => {
  score.value = 0;
  fail.value = false;
  setInterval(render, 10);
})

function sendScore() {
  errorMsg.value = '';
  if (turns.value < playerCount.value) {
    if (!isIn()) {
      if (!fail.value) return;
    }
  }
  emit('send-score', score.value);
  if (resetScore.value) score.value = 0;
  fail.value = false;
  turns.value++;
}

function isIn() {
  let passes = false;
  if (score.value >= 1000) {
    passes = true;
    errorMsg.value = '';
  } else {
    errorMsg.value = 'You need 1000 points first time. You can save less later';    
  }
  return passes;
}

// renders the text every 10ms
function render() {
  (document.querySelector('#d-1') as HTMLElement).innerHTML = d1.value.num.toString();
  (document.querySelector('#d-2') as HTMLElement).innerHTML = d2.value.num.toString();
  (document.querySelector('#d-3') as HTMLElement).innerHTML = d3.value.num.toString();
  (document.querySelector('#d-4') as HTMLElement).innerHTML = d4.value.num.toString();
  (document.querySelector('#d-5') as HTMLElement).innerHTML = d5.value.num.toString();
  (document.querySelector('#d-6') as HTMLElement).innerHTML = d6.value.num.toString();
}


// randomizes the numbers that haven't been saved by the player and saves
// the results to nums array
 function reRoll() {
  let nums: number[] = [];
  remove1.value = false;
  remove5.value = false;
  errorMsg.value = '';
  dice.value.forEach(x => {
    if (x.value.reroll) {
      x.value.num = Math.floor(Math.random() * 6 + 1);
      nums.push(x.value.num);
    }
  });
  checkPoints(nums);
}
//#region point-checking
function checkPoints(nums: number[]) {
  let tempPoints = 0;
  let done = false;
  if (nums.length == 6) {
    tempPoints += ladder(nums.sort());
    tempPoints += five_pair(nums.sort());
    done = tempPoints == 0? false : true;
  }
  if (nums.length >= 3 && !done) {
    const triples: number[] = triple(nums);
    tempPoints += triples[0] + triples[1];
    done = triples[0] != 0 && triples[1] != 0;
  }

  nums.forEach(x => {
    if (x == 1 && !remove1.value) {
      tempPoints += 100;
      dice.value.forEach(x => {
        if (x.value.num == 1) {
          stopReRoll(x.value.n_value);
        }
      })
    }
    else if (x == 5 && !remove5.value) {
      tempPoints += 50;
      
      dice.value.forEach(x => {
        if (x.value.num == 5) {
          stopReRoll(x.value.n_value);
        }
      })
    }
  })
  if (tempPoints == 0) {
    fail.value = true;
    failedTurn();
  } else {
    score.value += tempPoints;
  }
}
//only works with sorted nums
//if nums get's unsorted before, sort in function call maybe?
function ladder(nums: number[]) {
  let matching = true;
  for (let i = 0; i < 6; i++) {
    if (nums[i]-1 != i) {
      matching = false;
    }
  }
  if (matching) {
    remove1.value = true;
    remove5.value = true;
  }
  if (matching) {
    for (let i = 1; i <= 6; i++) {
      stopReRoll(i);
    }
  }
  return matching? 1500 : 0;
}
//only works with sorted nums
function five_pair(nums: number[]){
  const matching = nums[0] == nums[1] && nums[2] == nums[3] && nums[4] == nums[5] 
                    && nums[0] != nums[2] && nums[2] != nums[4];
  if (matching) {
    if (nums.includes(1)) remove1.value = true;
    if (nums.includes(5)) remove5.value = true;
    for (let i = 1; i <= 6; i++) {
      stopReRoll(i);
    }
  }
  
  return matching? 500 : 0;
}

//finds any triples by counting the appeareances of a certain number
//and calculates the appropriate value
function triple(nums: number[]) {
  let counts: number[] = [0, 0, 0, 0, 0, 0];
  nums.forEach(x => {
    counts[x-1]++;
  });
  let returnArr: number[] = [0, 0];
  let numToAdd: number = 0;
  let first = true;
  
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] >= 3) {
      const num = i+1;
      if (num == 1) remove1.value = true;
      else if (num == 5) remove5.value = true;
      // the math.pow is afterwards since 100 needs to be converted into 1000
      // ternary in calc didn't work at first but other method maybe will
      numToAdd = num * 100;
      numToAdd *= numToAdd==100? 10 : 1;
      numToAdd *= Math.pow(2, (counts[i]-3));
      if (numToAdd > 0) {
        if (first) {
          returnArr[0] = numToAdd;
          first = false;
        }
        else returnArr[1] = numToAdd;
      }
      dice.value.forEach(x => {
        if (x.value.num == num) stopReRoll(x.value.n_value);
      })
    }
  }
  return returnArr;
}
//#endregion

function stopReRoll(e: number) {
  dice.value[e-1].value.reroll = false;
  
  let allUsed = 0;
  dice.value.forEach(x => {
    if (x.value.reroll) {
      allUsed++;
    }
  });
  if (allUsed == 0) {
    disableButton.value = true;
    setTimeout(resetDice, 2000, false);
  }
}

function failedTurn() {
  disableButton.value = true;
  setTimeout(() => {
    score.value = 0;
    resetDice(true);
    sendScore();
  }, 2000);
}

function resetDice(m_resetScore: boolean) {
  dice.value.forEach(x => {
    x.value.reroll = true;
  })
  if (m_resetScore) {
    resetScore.value = m_resetScore;
  }
  disableButton.value = false;
}
</script>

<template>
  <span class="errorText">{{ errorMsg }}</span>
  <button id="claim-score-button" @click="resetDice(true); sendScore();">Claim Score</button>
  <h2 v-if="!fail">Current Score: {{ score }}</h2>
  <h2 v-else>Failed turn</h2>
  <div class="wrapper">
    <div class="dice-field">
      <div class="pair" v-for="d in dice" :key="d.value.name">
        <span v-bind:id="d.value.name" class="dice" :class="{ reroll: d.value.reroll, claimed: !d.value.reroll}"></span>        
      </div>
    </div>
  </div>
  <div id="reroll">
    <button @click="reRoll()" v-if="!disableButton">Roll dice</button>
    <button v-if="disableButton" id="disable-button">Roll dice</button>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/base.css';
$width: 25em;
h2 {
  text-align: center;  
}
.wrapper {
  display: flex;
  justify-content: center;
}
.dice-field {
  display: flex;
  justify-content: space-evenly;
  width: $width;  
  margin: 0;
    
  .pair {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: .3em;
    
    * {
      width: 100%;
      padding: 0;
      border: 0;
    }
    .dice {
      background-color: var(--color-background-mute);
      width: 3em;
      padding: .7em 0;
      height: fit-content;
    }
    .reroll {
      box-shadow: 0em 0em .1em .1em var(--vt-c-red);
    }
    .claimed {
      box-shadow: 0em 0em .2em .2em var(--vt-c-green);
    }
    button {
      margin-top: .3em;
      height: 3em;
    }
  }
}
#claim-score-button {
  width: $width;
  margin: 0 auto;
  height: 4em;
}
#reroll {
  width: $width;
  margin: 0 auto;

  button {
    width: 100%;
    height: 4em;
    margin-top: 1em;
  }
  #disable-button {
    opacity: 40%;
  }
}
</style>