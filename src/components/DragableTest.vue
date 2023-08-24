<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const meals = ref([
    'Hamburger',
    'Pizza',
    'Spaghetti',
    'Taco',
    'Teriyaki'
]);

const badMeals = ref([
    'Bat wing soup',
    'Spicy octopus'
]);

const newMeals = ref([] as string[]);
const newFood = ref('' as string);

function addNewFood() {
    //const newList = document.querySelector('input') as HTMLElement;
    newMeals.value = [...newMeals.value, newFood.value];
}

</script>

<template>
    <div class="wrapper">
        <div class="goodlist">
            <h2>Good Foods</h2>
            <draggable v-model="meals" tag="ul" group="meals" :animation="300">
                <template #item="{ element: meal }">
                    <li>{{ meal }}</li>
                </template>
            </draggable>
        </div>
        <div class="newlist">
            <h2>Add New Food</h2>
            <form v-on:submit.prevent="addNewFood()">
                <input v-model="newFood" placeholder="new food" />
                <button type="submit">Add</button>
            </form>
            <draggable v-model="newMeals" tag="ul" group="meals" :animation="300">
                <template #item="{ element: meal }">
                    <li>{{ meal }}</li>
                </template>            
            </draggable>
        </div>
        <div class="badlist">
            <h2>Bad foods</h2>
            <draggable v-model="badMeals" tag="ul" group="meals" :animation="300">
                <template #item="{ element: meal }">
                    <li>{{ meal }}</li>
                </template>
            </draggable>
        </div>
    </div>    
</template>

<style scoped lang="scss">
@use '../assets/base.css';
.wrapper {
    display: flex;
    justify-content: space-evenly;

    > * {
        background-color: var(--color-background-soft);
        padding: 1em;
        padding-top: 0;
        border-radius: .8em;
        border: .2em solid var(--color-border);
        height: 30em;
        width: 15em;
    }
}
form > * {
    width: 100%;
    height: 3em;
}
ul {
    height: 90%;
}
</style>