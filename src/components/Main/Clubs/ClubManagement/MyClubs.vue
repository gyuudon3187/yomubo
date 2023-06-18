<script setup lang="ts">
import Accordion from '@/components/Misc/Accordion.vue';
import type { AccordionItem } from '@/types/misc';
import { initializeClubAccordionItems } from '@/components/util'
import { ref } from 'vue';

const itemOne: AccordionItem = {
    label: "test1",
    selected: ref(false),
    subItems: [
        {
            icon: "fa-solid fa-house",
            label: "members",
            value: "5/8"
        }
    ]
}

const itemTwo: AccordionItem = {
    label: "test2",
    selected: ref(false),
    subItems: [
        {
            icon: "fa-solid fa-message",
            label: "chat",
            value: "huh"
        }
    ]
}

const test = initializeClubAccordionItems([
    {
        label: "Test",
        members: {
            current: 5,
            max: 8
        },
        language: "Japanese",
        meeting: "Physical",
        pace: 230,
        gender: "All",
        genre: "Mystery"
    },
    {
        label: "Test2",
        members: {
            current: 5,
            max: 8
        },
        language: "Japanese",
        meeting: "Physical",
        pace: 230,
        gender: "All",
        genre: "Mystery"
    }
])
</script>

<template>
    <div>
        <div class="myClubsTitle">
            <p style="color: var(--color-on-background)">My Clubs</p>
            <div class="line"></div>
        </div>
        <Accordion class="myClubs" :items="test"/>
        <!-- <div class="myClubs">
            <p>test</p>
            <p>test2</p>
        </div> -->
    </div>
</template>

<style scoped>
.myClubsTitle {
    font-size: 2vw;
    bottom: -0.6vw;
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