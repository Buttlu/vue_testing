<script setup lang="ts">
import { ref, onMounted } from 'vue';

const counter = ref(0);
const increment = ref(0);
const hideText = ref(true);


function hide_text() {
    let text_span = document.getElementById('text') as HTMLElement;
    // use .value to use above vars in functions
    text_span.innerHTML = 'Currenly the counter is ' + counter.value;
    hideText.value = !hideText.value;
}
//called on startup, import at top
onMounted(() => {
    
});
</script>

<template>
    <div class="t1">
        <h1>Counter: {{ counter }}</h1>
        <h3>Increment {{ increment }}</h3>
        <button @click="increment++">Increase increment</button>
        <button @click="counter+=increment">Increase counter</button>
        <button @click="counter-=increment">Decrease counter</button>
        <button @click="increment--">Decrease increment</button>
    </div>
    <div class="t2">
        <button @click="hide_text()">Show text</button>
        <span v-show="hideText" id="text"></span>
    </div>
</template>