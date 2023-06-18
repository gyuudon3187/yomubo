<script setup lang="ts">
import MyClubs from './MyClubs.vue';
import FindClubs from './FindClubs.vue';

</script>

<template>
    <div class="container">
        <MyClubs />
        <FindClubs />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}
</style>