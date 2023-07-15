<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import { useClubStore } from '@/stores/club';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const clubStore = useClubStore();
const { selectedClub, isClubOwner } = storeToRefs(clubStore);

const routeIsMyClubs = computed(() => useRoute().matched[0].name === "myClubs");
</script>

<template>
    <div>
        <div v-if="routeIsMyClubs" class="header">
            <p style="padding-right: 1vw;">{{ selectedClub.label }}</p>
            <nav>
                <RouterLink to="/myClubs">
                    <Icon icon="fa-solid fa-house" size="2xs"/>
                </RouterLink>
                <RouterLink to="/myClubs/meeting">
                    <Icon icon="fa-solid fa-book" size="2xs"/>
                </RouterLink>
                <RouterLink to="/">
                    <Icon icon="fa-solid fa-message" size="2xs"/>
                </RouterLink>
                <RouterLink to="/">
                    <Icon v-if="isClubOwner" icon="fa-solid fa-gear" size="2xs"/>
                </RouterLink>
            </nav>
            
            <div class="line"></div>
        </div>
        <div v-else style="height: 4vw"></div>
        <RouterView />
    </div>
    
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.header {
    font-size: 2.5vw;
    color: var(--color-on-background);
    display: flex;
    flex-direction: row;
    position: relative;
}

nav > * {
    color: var(--color-alt-on-background);
    padding-right: 0.5vw;
}

nav > *.router-link-exact-active>* {
    color: var(--color-primary-container);
}

.clubContent {
    background-color: var(--color-background);
    border-radius: 4.5vw;
    width: 54.5vw;
    height: 40vw;
    padding: 2vw 2vw;
}

.line {
    height: 1.5px;
    width: 100%;
    position: absolute;
    bottom: 5px;
    background-color: var(--color-border);
}

</style>