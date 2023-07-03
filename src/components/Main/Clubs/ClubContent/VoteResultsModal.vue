<script setup lang="ts">
import Modal from '@/components/Misc/NewModal.vue';
import Button from '@/components/Misc/Button.vue';
import { Stage, initializeButton } from '@/components/util';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useClubStore } from '@/stores/club';
import { useModalStore } from '@/stores/modal';
const clubStore = useClubStore();
const { selectedClub, currentVotes } = storeToRefs(clubStore);
const modalStore = useModalStore();
const { voteResultsModalIsVisible } = storeToRefs(modalStore);

const basePath = "mainPage.modals.voteResults."

const votedBookIds = Object.values(currentVotes.value);
const uniqueVotedBookIds = Array.from(new Set(votedBookIds));
const votes: number[] = uniqueVotedBookIds.map(bookId => 
    uniqueVotedBookIds.reduce((acc, id) => bookId === id ? acc + 1 : acc, 0))
const books = uniqueVotedBookIds.map(bookId => 
    selectedClub.value.readingList.find(book => bookId === book.id))
const winningBookIndex = votes.indexOf(getLargestVoteCount());
const winningBook = books[winningBookIndex];

const displayVotes = votes.map(_ => ref(0));
const voteBarIsVisible = ref(false);
const revealWinner = ref(false);
const ellipsis = ref(".");

const startReadingButtonProps = initializeButton(
    basePath + "startReading", "primary", startReading
)

setTimeout(() => {
    voteBarIsVisible.value = true;
    const intervals = votes.map(vote => vote !== 0 ? 1000 / vote : undefined);
    const timers: NodeJS.Timeout[] = [];
    intervals.forEach((interval, index) => {
        if(interval) timers.push(setInterval(() => displayVotes[index].value++, interval))
    })

    setTimeout(() => timers.forEach(timer => clearTimeout(timer)), 1000)
}, 500);
setTimeout(() => revealWinner.value = true, 1500)
setInterval(() => ellipsis.value = ellipsis.value.length < 3 ? ellipsis.value + "." : ".", 200)

function startReading() {
    setTimeout(() => {
        clubStore.updateCurrentMeeting("stage", Stage.Reading)
        clubStore.updateCurrentMeeting("currentlyReading", winningBook!.id)
    }, 1000)
    
    modalStore.close(voteResultsModalIsVisible);
}

function calcVotePercentage(index: number): string {
    const votesSum = votes.reduce((acc, count) => acc + count, 0);
    const thisVoteCount = votes[index];

    return (thisVoteCount / votesSum * 100) + '%';
}

function getLargestVoteCount() {
    return Math.max(...votes);
}

</script>

<template>
    <Modal name="voteResults" no-footer no-close-button>
        <template #header>
            <h2>Vote Results</h2>
        </template>
        <template #default>
            <div class="container">
                <div class="subheader">
                    <p>Reading Candidates</p>
                    <p>Votes</p>
                </div>
                <div class="lines">
                    <div class="horizontal-line"></div>
                </div>
                <div class="titlesAndVotes">
                    <div class="titles">
                        <div v-for="(book, index) in books" class="title">
                            <Transition v-show="voteBarIsVisible" name="slide-right">
                                <div class="voteBar" :style="{ width: calcVotePercentage(index)}"></div>
                            </Transition>
                            <p style="margin-bottom: 5px;">{{ book?.title }}</p>
                        </div>
                    </div>
                    <div class="votes">
                        <div v-for="vote in displayVotes" class="voteContainer">
                            <p>{{ vote.value }}</p>
                        </div>
                    </div>
                </div>
                <div class="winner">
                    <div class="flip-outer">
                        <div class="flip-inner" :class="{ flip: revealWinner }">
                            <div class="front">
                                <img src="src/assets/placeholder.png"/>
                            </div>
                            <div class="back">
                                <img :src="winningBook?.image" />
                            </div>
                        </div>
                    </div>
                    <Transition name="fade" mode="out-in" v-show="revealWinner">
                        <div style="width: 40vw; position: relative; margin-left: 10px">
                            <div style="overflow-y: scroll;">
                                <p class="bookTitle">{{ winningBook?.title }}</p>
                                <p style="color: var(--color-alt-on-background); font-size: 1.1vw;">Mizuki Tsujimura</p>
                                <p><span style="color: var(--color-on-background); font-weight: bold; font-size: 1.5vw;">{{ getLargestVoteCount() }}</span> votes</p>
                                <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                                    <div class="dueDate">
                                        <!-- <p>To be read due:</p>
                                        <p >{{ new Date(currentMeeting.date).toLocaleString().slice(0, 16) }}</p> -->
                                    </div>
                                    <Button :button-props="startReadingButtonProps" />
                                </div>
                            </div> 
                            <div>

                            </div>
                        </div>
                    </Transition>
                    <div v-show="!revealWinner" class="rollDrum">
                        <div style="width: 40vw; margin-left: 10px">
                            <div style="width: 16.3vw">
                                <h1 style="color: var(--color-on-background)">The winner is{{ ellipsis }}</h1>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style scoped>
.slide-right-enter-active {
    transition: all 1s ease-out;
    max-width: 100%;
}

.slide-right-enter-from {
    max-width: 0;
}

.fade-enter-active,
.fade-leave.active {
    transition: all 2s ease;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.bookTitle {
    font-size: 1.4vw;
    font-weight: 700;
}

p {
    color: var(--color-on-background);
}
.container {
    width: 30vw;
}

.subheader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.subheader p {
    font-weight: bold;
}

.lines {
    position: relative;
}

.horizontal-line {
    border-bottom: solid 2px var(--color-alt-on-background);
}

.titlesAndVotes {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}

.titles {
    flex-grow: 7;
}

.title {
    position: relative;
}

.voteBar {
    width: 3vw; 
    height: 2vw; 
    background-color: var(--color-positive); 
    border-radius: 0 10px 10px 0px;
    position: absolute; 
    z-index: -1
}

.votes {
    flex-grow: 1;
}

.voteContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 5px;
}

.winner {
    display: flex;
    flex-direction: row;
    height: 10vw;
}

.flip-outer {
    background-color: transparent;
    perspective: 1000px;
}

.flip-inner {
    position: relative;
    transition: transform 2s;
    transform-style: preserve-3d;
}

.front {
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.back {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: rotateY(180deg);
}

.flip {
    transform: rotateY(180deg);
}

.dueDate {
    position: relative;
    font-size: 0.9vw;
}

img {
    width: auto;
    height: 10vw;
    border-radius: 0.3vw;
}

.rollDrum {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>