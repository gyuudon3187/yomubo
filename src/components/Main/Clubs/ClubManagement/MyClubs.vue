<script setup lang="ts">
import Accordion from '@/components/Misc/Accordion.vue';
import type { AccordionItem, Club } from '@/types/misc';
import { useClubStore } from '@/stores/club';
import { initializeClubAccordionItems } from '@/components/util'
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
const { clubs, selectedClub } = storeToRefs(useClubStore());

const accordionProps = initializeClubAccordionItems(clubs.value)

function selectClub(items: AccordionItem[]) {
    const newSelectedClub = items.find(item => item.selected)?.data as Club;
    const readingList = newSelectedClub.readingList;

    selectedClub.value = Object.assign(newSelectedClub, {
        readingList: readingList.map((book, index) => Object.assign(book, {
            selected: index === 0
        }))
    });
}
</script>

<template>
    <div>
        <div class="myClubsTitle">
            <p style="color: var(--color-on-background)">My Clubs</p>
            <div class="line"></div>
        </div>
        <Accordion class="myClubs" :accordion-props="accordionProps" :on-selected="selectClub"/>
    </div>
</template>

<style scoped>
.myClubsTitle {
    font-size: 2vw;
    bottom: -0.6vw;
    position: relative;
}

.myClubs {
    margin-top: 1vw;
}

.myClubs p {
    font-weight: bold;
    cursor: pointer;
    width: fit-content;
}

.line {
    height: 1.5px;
    width: 55%;
    position: absolute;
    bottom: 0px;
    background-color: var(--color-border);
}
</style>