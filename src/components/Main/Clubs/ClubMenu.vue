<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSearchClubStore } from '@/stores/searchClub';
import { storeToRefs } from 'pinia';
const { searchResults } = storeToRefs(useSearchClubStore());

const icons = ['fa-house', 'fa-magnifying-glass', 'fa-plus']
const titles = ['My Clubs', 'Find Clubs', 'Create Club']
const links = ['/myClubs', '/findClubs', '/createClub']
const options = icons.map((icon, index) => ({
    icon,
    title: titles[index],
    to: links[index]
}))

function handleClick(path: string) {
    if(path === '/findClubs') {
        searchResults.value = [];
    }
}
</script>

<template>
    <div class="pad">
        <div class="menuWrapper">
            <div class="menu">
                <p class="header">Menu</p>
                <div class="line"></div>
            </div>
            <div class="options">
                <div v-for="option in options" class="optionWrapper">
                    <RouterLink :to="option.to" @click="handleClick(option.to)" class="flexRow option" :class="{ selectedOption: option.to === $route.matched[0].path}">
                        <Icon :icon="'fa-solid ' + option.icon" />
                        <p>{{ option.title }}</p>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flexRow {
    display: flex;
    flex-direction: row;
}

.pad {
    width: 14vw;
    height: 100%;
}

.menuWrapper {
    height: 100%; 
    position: fixed;
    border-left: 1px solid var(--color-border);
}

.menu {
    position: relative;
    display: flex;
    justify-content: flex-end;
}

.options {
    margin-left: 4.5vw;
    position: relative;
}

.optionWrapper {
    position: relative;
}

.option {
    color: var(--color-alt-on-background);
    padding-top: 1vw;
    padding-left: 1vw;
    user-select: none;
    cursor: pointer;
    align-items: center;
    font-size: 1.2vw;
}

.option::after {
    content: '';
    transition: all 0.5s;
    height: 0;
    position: absolute;
    left: 0;
    bottom: 1vw;
    border-left: 3px solid var(--color-on-background);
}

.option::before {
    content: '';
    transition: all 0.5s;
    height: 0;
    position: absolute;
    left: 0;
    top: 1.9vw;
    border-left: 3px solid var(--color-on-background);
}

.option:hover {
    color: var(--color-on-background);
}

.option>* {
    padding-right: 0.5vw;
}

.selectedOption {
    color: var(--color-on-background);
}

.selectedOption::after {
    content: '';
    transition: all 0.5s;
    height: 1vw;
    position: absolute;
    left: 0;
    bottom: 1vw;
    border-left: 3px solid var(--color-on-background);
}

.selectedOption::before {
    content: '';
    transition: all 0.5s;
    height: 1vw;
    position: absolute;
    left: 0;
    top: 1.9vw;
    border-left: 3px solid var(--color-on-background);
}

.header {
    font-size: 2.5vw;
    color: var(--color-on-background);
}

.line {
    height: 1.5px;
    width: 55%;
    position: absolute;
    bottom: 5px;
    background-color: var(--color-border);
}
</style>