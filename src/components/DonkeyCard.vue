<script setup lang="ts">

</script>

<template>
    <div class="wrapper">
        <slot name="number" />
    </div>
</template>

<style scoped lang="scss">
@use '../assets/base.css';
.wrapper {
    width: 3em;
    height: 3em;
    background-color: var(--color-background-mute);
    text-align: center;
    margin: .3em;    
}
</style>