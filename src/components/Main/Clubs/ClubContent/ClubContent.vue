<script setup lang="ts">
import Book from './Book/Book.vue';
import Votes from './Votes.vue';
import ReadingList from './ReadingList/ReadingList.vue';
import NextMeeting from './NextMeeting.vue'
import { Stage } from '@/components/util';
import { computed } from 'vue';
import { useClubStore } from '@/stores/club';
import { storeToRefs } from 'pinia';
const clubStore = useClubStore();
const { selectedClub, isClubOwner } = storeToRefs(clubStore);

</script>

<template>
    <div>
        <div class="header">
            <p style="padding-right: 1vw;">{{ selectedClub.label }}</p>
            <nav>
                <RouterLink to="/">
                    <Icon icon="fa-solid fa-house" size="2xs"/>
                </RouterLink>
                <RouterLink to="/">
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
        <div v-if="clubStore.isInStage(Stage.Start)">

        </div>
        <div v-else-if="clubStore.isInStage(Stage.Voting)" class="clubContent readingStage">
            <Book />
            <Votes />
            <ReadingList />
            <NextMeeting />
        </div>
    </div>
    
</template>

<style scoped>
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

.clubContent {
    background-color: var(--color-background);
    border-radius: 4.5vw;
    width: 54.5vw;
    height: 40vw;
    padding: 2vw 2vw;
}

.readingStage {
    display: grid;
    grid-template-columns: 35vw 13vw;
    grid-auto-rows: 16.4vw;
    grid-column-gap: 2vw;
    grid-row-gap: 2.5vw;
}

.line {
    height: 1.5px;
    width: 100%;
    position: absolute;
    bottom: 5px;
    background-color: var(--color-border);
}
</style>