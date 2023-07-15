<script setup lang="ts">
import type { Club, AccordionItem } from '@/types/misc';
import { initializeClubAccordionItems } from '@/components/util';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useSearchClubStore } from '@/stores/searchClub';
import { useClubStore } from '@/stores/club';
import { computed, ref, onUpdated } from 'vue';
const { searchResults } = storeToRefs(useSearchClubStore());
const { t } = useI18n();

const selectedSearchResult = ref(<AccordionItem | null> null);
const introductionEl = ref(<HTMLElement | null> null)
const selectedSearchResultIndex = computed(() => searchResults.value.indexOf(selectedSearchResult.value as AccordionItem) ?? 0)
const searchResultsAreVisible = computed(() => searchResults.value.length > 0);

const { selectSearchResult, unselectSearchResult } = initializeSelectFunctions();

function initializeSelectFunctions() {
    let timer: NodeJS.Timeout;

    return {
        selectSearchResult,
        unselectSearchResult
    }

    function selectSearchResult(processedClub: AccordionItem) {
        selectedSearchResult.value = processedClub;
        clearTimeout(timer);
        scrollIntroduction();

        function scrollIntroduction() {
        introductionEl.value?.scrollBy(0, -100);
        timer = setTimeout(executeScroll, 2000)

        function executeScroll() {
            timer = setInterval(() => {
                introductionEl.value?.scrollBy(0, 1);
                if(introductionEl.value?.scrollTop === 100) clearTimeout(timer)
            }, 40)
        }
    }
    }

    function unselectSearchResult() {
        selectedSearchResult.value = null;
        clearTimeout(timer);
    }
}
</script>

<template>
    <div class="clubContent">
        <div v-if="searchResultsAreVisible" class="widget">
            <div>
                <div class="header">
                    <p>Search Results</p>
                </div>
                <div class="searchResults">
                    <div @mouseleave="unselectSearchResult">
                        <div v-for="searchResult in searchResults" @mouseenter="selectSearchResult(searchResult)" class="searchResult">
                            <div>
                                <p>{{ searchResult.label }}</p>
                                <div style="display: flex; flex-direction: row;">
                                    <Icon style="margin-top: 0.1vw; padding-right: 0.1vw;" icon="fa-solid fa-user-group" />
                                    <p style="padding-right: 1vw;">{{ searchResult.subItems[0].value }}</p>
                                    <!-- <Icon style="margin-top: 0.2vw; padding-right: 0.1vw;" icon="fa-solid fa-book-open" />
                                    <p style="padding-right: 1vw;">5</p> -->
                                </div>
                            </div>
                            <button class="join">Join</button>
                        </div>
                    </div>
                </div>
            </div>
            <Transition name="slide-vertically">
                <div v-show="selectedSearchResult" class="selectedSearchResult">
                    <img src="src/assets/banner.png" />
                    <div class="clubInfo">
                        <p style="font-weight: bold;">Introduction</p>
                        <div ref="introductionEl" class="introduction">
                            <p>{{ selectedSearchResult?.data.settings.introduction ?? "" }}</p>
                        </div>
                        <div class="subItems">
                            <div class="subItem" v-for="subItem in searchResults[selectedSearchResultIndex]?.subItems ?? []">
                                <div class="subItemLabel">
                                    <Icon :icon="subItem.icon" />
                                    <p>{{ subItem.label }}</p>
                                </div>
                                <p class="subItemValue">{{ subItem.value }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <div v-else style="display: flex; justify-content: center; align-items: center;">
            <img src="src/assets/searchClubs.png" style="width: 40vw; height: auto" />
        </div>
    </div>
    
</template>

<style scoped>
p {
    color: var(--color-on-background);
    font-size: 1vw;
}

.slide-vertically-enter-active,
.slide-vertically-leave-active {
    transition: all 0.3s;
    opacity: 1;
    transform: translateY(0);
}

.slide-vertically-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.slide-vertically-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.widget {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2.5vw;
    height: 100%;
}

.widget div {
    
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-on-primary);
    height: 1.8vw;
    padding: 0 1vw 0 1vw;
    width: 100%;
    border-radius: 1.8vw 1.8vw 0 0;
}

.header p {
    font-weight: bold;
}

.searchResults {
    height: 34.2vw;
    padding: 0.5vw 0.5vw 0 1vw;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
    overflow-x: hidden;
    overflow-y: scroll;
}

.searchResult {
    transition: all 0.1s;
    padding: 0 0.5vw;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.searchResult:hover {
    transition: all 0.1s;
    box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.3);
}

.searchResult:not(:hover) {
    color: var(--color-alt-on-background);
}

.searchResult:hover .join {
    transition: all 0.1s;
    opacity: 1;
}

.join {
    transition: all 0.1s;
    opacity: 0;
    background-color: var(--color-positive);
    color: var(--color-on-positive);
    width: 3.5vw;
    transition: all 0.2s;
    border: none;
    border-radius: 1vw;
    cursor: pointer;
}

.join:hover {
    transition: all 0.1s;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.356);
}

.userIcon {
    width: auto;
    height: 1vw;
    color: var(--color-alt-on-background);
    position: absolute;
    top: 0.2vw
}

.selectedSearchResult {
    height: 100%;
    background-color: white;
    border-radius: 1.8vw;
    box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.3);
}

.selectedSearchResult img {
    width: 100%;
    border-radius: 1.8vw 1.8vw 0 0;
}

.clubInfo {
    padding: 0.5vw 0.5vw 0 1vw;
}

.introduction {
    height: 5vw;
    overflow-y: scroll;
}

.subItems {
    padding: 0.4vw 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* grid-column-gap: 2.5vw; */
    height: 100%;
}

.subItem {
    padding: 0.3vw 0;
    font-size: 0.93vw;
}

.subItemLabel {
    display: flex;
    color: var(--color-alt-on-background);
}

.subItemLabel p {
    padding-left: 0.3vw;
    color: var(--color-alt-on-background);
}

.subItemValue {
    color: var(--color-on-background);
}

.location {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    color: var(--color-on-background);
    box-sizing: border-box;
}

.location:hover, .location:focus {
    border-color: #aaaeb7;
}

</style>

<style>
.dp-custom-input {
    font-size: smaller;
    height: 1.5vw;
    padding-left: 0.3vw;
}
</style>