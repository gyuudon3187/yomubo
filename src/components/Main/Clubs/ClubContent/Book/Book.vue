<script setup lang="ts">
import type { BookCandidate } from '@/types/misc';
import type { Ref } from 'vue';
import { ref, computed, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useClubStore } from '@/stores/club';
import RangeSlider from '@/components/Misc/RangeSlider.vue';
import { Stage } from '@/components/util';
const clubStore = useClubStore();
const { selectedClub, currentMeeting } = storeToRefs(clubStore);
const selectedBook: Ref<BookCandidate | null> = ref(null);

const tabs = ["Synopsis", "Progress"];
const selectedTabs = ref([true, false])

const readPages = ref(0);
const totalPages = ref(360);
const daysUntilMeeting = computed(() => Math.ceil(
    (new Date(currentMeeting.value.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
)

watch(() => selectedClub.value.readingList, () => {
    if(currentMeeting.value.stage === Stage.Voting) {
        selectedBook.value = selectedClub.value.readingList.find(book => book.selected) ?? null;
        totalPages.value = selectedBook.value?.pages ?? 0;
    }
})

watch(() => currentMeeting.value.currentlyReading, () => {
    if(currentMeeting.value.stage === Stage.Reading) {
        selectedBook.value = selectedClub.value.readingList.find(book => book.id === currentMeeting.value.currentlyReading) ?? null;
    }
})

function selectTab(index: number) {
    selectedTabs.value = selectedTabs.value.map((_, i) => index === i);
}
</script>

<template>
    <div class="container">
        
        <div class="subcontainer">
            
                <div v-if="selectedBook" class="content">
                    <p :class="{ 
                            bookTitle: selectedBook.title.length < 31,
                            longBookTitle: selectedBook.title.length > 31 }">{{ selectedBook.title }}</p>
                    <p style="color: var(--color-alt-on-background); font-size: 1.1vw; top: -0.6vw">{{ selectedBook.authors }}</p>
                    <Transition v-show="selectedTabs[0]" name="slide-left" mode="out-in">
                        <p class="synopsis">{{ selectedBook.synopsis }}</p>
                    </Transition>
                    <Transition v-show="selectedTabs[1]" name="slide-right" mode="out-in">
                        <div class="progress">
                            <div class="statistics">
                                <div class="statisticsItem">
                                    <p>Pages read</p>
                                    <span>{{ readPages }} / {{ totalPages }}</span>
                                </div>
                                <div class="statisticsItem">
                                    <p>Pages to read/day</p>
                                    <span>{{ Math.ceil((totalPages - readPages) / daysUntilMeeting) }}</span>
                                </div>
                            </div>
                            <RangeSlider @update:read-pages="val => readPages = Number(val)" :read-pages="readPages" :total-pages="totalPages" />
                        </div>
                    </Transition>
                </div>
                
                <div v-else style="color:black" class="content">
                    <p style="font-size: 1.4vw; font-weight: 700;">No book selected.</p>
                    <p style="font-size: 1.1vw;">To get started, search for a book in the search bar below and click on the book to add it to the Reading List. <br /> Then, click on the added book to select it.</p>
                </div>

        </div>
        <div v-show="clubStore.isInStage(Stage.Reading)" class="tabs">
            <div v-for="(tab, index) in tabs" @click="() => selectTab(index)" class="tab" :class="{ unselectedTab: !selectedTabs[index], selectedTab: selectedTabs[index]}">
                <p>{{ tab }}</p>
            </div>
        </div>
        <img class="book" :src="selectedBook?.image ?? 'src/assets/placeholder.png'"/>
    </div>
</template>

<style scoped>

.slide-left-enter-active {
    transition: all 300ms ease-out;
    transform: translateX(-50px);
    opacity: 0;
}

.slide-left-leave-active {
    transition: opacity 150ms ease-in, transform 300ms ease-in;
    transform: translateX(-50px);
    opacity: 0;
}

.slide-left-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.slide-right-enter-active {
    transition: all 300ms ease-out;
    transform: translateX(50px);
    opacity: 0;
}

.slide-right-leave-active {
    transition: opacity 150ms ease-in, transform 300ms ease-in;
    transform: translateX(50px);
    opacity: 0;
}

.slide-right-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.container {
    /* width: 35vw; */
    height: 16.4vw;
    /* background-color: green; */
    position: relative;
}

.book {
    border-radius: 3px;
    position:absolute;
    bottom: 2vw;
    left: 2vw;
    width: 10vw;
    height: auto;
}

.subcontainer {
    width: 100%;
    height: 13.3vw;
    background-color: white;
    border-radius: 20px;
    bottom: 0;
    position: absolute;
}

.content {
    padding-left: 13vw;
    padding-top: 0.5rem;
    width: 34vw;
    /* background-color: red; */
}

.bookTitle {
    color: var(--color-on-background);
    font-size: 1.4vw;
    font-weight: 700;
}

.longBookTitle {
    color: var(--color-on-background);
    font-size: 1vw;
    font-weight: 700;
}

.synopsis {
    overflow-y: auto; 
    height: 7vw;
    font-size:1vw;
    color: var(--color-on-background);
    position: absolute;
}

.tabs {
    display: flex;
    flex-direction: row;
    width: 10.5vw;
    height: 1.65vw;
    position: absolute;
    right: 4vw;
    top: 1.45vw
}

.tab {
    position: relative;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    padding: 0em 1em 0;
    margin: 0 -.3em;
    cursor: pointer;
    user-select: none;
}

.tab p {
    z-index: 3;
    color: #878787;
    position: relative;
}

.tab::before {
    content: '';
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	z-index: 1;
	border-bottom: none;
	border-radius: .5em .5em 0 0;
	background: #E9E8E8;
	transform: scale(1.1, 1.3) perspective(.5em) rotateX(5deg);
	transform-origin: bottom;  
}

.selectedTab p {
    color: var(--color-on-background);
}

.selectedTab::before {
    content: '';
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	z-index: 2;
	border-bottom: none;
	border-radius: .5em .5em 0 0;
	background: white;
	transform: scale(1.1, 1.3) perspective(.5em) rotateX(5deg);
	transform-origin: bottom;  
}

.progress {
    /* display: flex; */
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* overflow-y: auto; */
    max-height: 9vw;
    /* top: -1vw; */
    color: var(--color-on-background);
    /* bottom: 0px; */
}

.statistics {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.statisticsItem {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 0.8vw;
}

.statisticsItem p {
    display: flex;
    justify-content: flex-start;
    font-weight: bold;
    color: var(--color-primary);
}

.statisticsItem span {
    display: flex;
    justify-content: flex-end;
    font-size: 1.5vw;
    font-weight: bold;
}

.radialProgress {
    /* position: absolute;
    top: -3vw;
    margin-right: 0; */
}

.radialProgress p, .radialProgress span {
    font-size: 20px;
    font-weight: bold;
}
</style>