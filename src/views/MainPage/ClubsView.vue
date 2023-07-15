<script setup lang="ts">
import ClubContent from '@/components/Main/Clubs/ClubContent/ClubContent.vue'
import ClubMenu from '@/components/Main/Clubs/ClubMenu.vue';
</script>

<template>
    <ClubContent />
    <ClubMenu />
</template>

<style scoped>
.container {
    padding: 1rem 3rem;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>