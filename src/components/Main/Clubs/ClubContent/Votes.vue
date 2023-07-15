<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';
import { useClubStore } from '@/stores/club';
import { useModalStore } from '@/stores/modal';
import { useI18n } from 'vue-i18n';
import { Stage } from '@/components/util';
import type { Member } from '@/types/misc';
import { computed, ref, watch } from 'vue';
const clubStore = useClubStore();
const { displayAlert } = useAlertStore();
const { selectedClub, currentMeeting, currentMeetingIndex } = storeToRefs(clubStore);
const { voteResultsModalIsVisible } = storeToRefs(useModalStore());
const { t } = useI18n();

const basePath = "mainPage.clubContent.votesOrReading."

const countdownPath = basePath + "countdown."
const timeUnitPath = countdownPath + "timeUnits."

const votesPath = basePath + "votes."
const votesSubheadersPath = votesPath + "subheaders."

const readingPath = basePath + "reading."
const readingSubheadersPath = readingPath + "subheaders."

const VOTING_MODE = {
    HEADER: t(votesPath + "header"),
    SUBHEADERS: {
        MEMBER: t(votesSubheadersPath + "member"),
        HAS_VOTED: t(votesSubheadersPath + "hasVoted")
    }
}

const READING_MODE = {
    HEADER: t(readingPath + "header"),
    SUBHEADERS: {
        PARTICIPANTS: t(readingSubheadersPath + "participants"),
        PROGRESS: t(readingSubheadersPath + "progress")
    }
}

const TIME_UNITS = {
    SECONDS: t(timeUnitPath + "seconds"),
    MINUTES: t(timeUnitPath + "minutes"),
    HOURS: t(timeUnitPath + "hours"),
    DAYS: t(timeUnitPath + "days")
}
const untilVotesAreCounted = t(countdownPath + "untilVotesAreCounted")

enum TimeUnit {
    Second = 1000,
    Minute = 1000 * 60,
    Hour = 1000 * 60 * 60,
    Day = 1000 * 60 * 60 * 24
}

const now = ref(new Date().getTime());
const timer = setInterval(() => now.value = new Date().getTime(), 1000);

const distance = computed(() => new Date(currentMeeting.value.votingDeadline).getTime() - now.value);
const seconds = computed(() => Math.floor((distance.value % TimeUnit.Minute) / TimeUnit.Second));
const minutes = computed(() => Math.floor((distance.value % TimeUnit.Hour) / TimeUnit.Minute));
const hours = computed(() => Math.floor((distance.value % TimeUnit.Day) / TimeUnit.Hour));
const days = computed(() => Math.floor(distance.value / TimeUnit.Day));

watch(distance, () => {
    if(distance.value < 0 && clubStore.isInStage(Stage.Voting)) {
        if(Object.keys(currentMeeting.value.votes).length !== 0) {
            clearTimeout(timer);
            voteResultsModalIsVisible.value = true;
        } else {
            extendDateByOneDay("date");
            extendDateByOneDay("votingDeadline");
            displayAlert(t("alert.deadlineNoVotes"), false);

            function extendDateByOneDay(dateOrDeadline: "date" | "votingDeadline") {
                const value = new Date((dateOrDeadline === "date" ? 
                                        new Date(currentMeeting.value.date) : 
                                        new Date()).getTime() + TimeUnit.Day).toJSON() 
                clubStore.updateCurrentMeeting(dateOrDeadline, value)
            }
        }
    }
})

function hasVoted(member: Member) {
    return !!currentMeeting.value.votes[member.id]
}
</script>

<template>
    <div>
        <Transition name="fade-up" mode="out-in">
            <p v-if="clubStore.isInStage(Stage.Voting)" class="header">{{ VOTING_MODE.HEADER }}</p>
            <p v-else-if="clubStore.isInStage(Stage.Reading)" class="header">{{ READING_MODE.HEADER }}</p>
        </Transition>
        
        <div class="votesContent">
            <div class="subheaderContainer">
                <Transition name="fade-up" mode="out-in">
                    <div v-if="clubStore.isInStage(Stage.Voting)" class="subheader">
                        <p>{{ VOTING_MODE.SUBHEADERS.MEMBER }}</p>
                        <p>{{ VOTING_MODE.SUBHEADERS.HAS_VOTED }}</p>
                    </div>
                    <div v-else-if="clubStore.isInStage(Stage.Reading)" class="subheader">
                        <p>{{ READING_MODE.SUBHEADERS.PARTICIPANTS }}</p>
                        <p>{{ READING_MODE.SUBHEADERS.PROGRESS }}</p>
                    </div>
                </Transition>
            </div>
            
            <div class="panel">
                <div class="memberList">
                    <div v-for="member in selectedClub.members" class="member">
                        <div class="iconAndName">
                            <Icon icon="fa-solid fa-user-circle" size="xl" class="userIcon"/>
                            <p>{{ member.name }}</p>
                        </div>
                        
                        <Icon icon="fa-solid fa-circle-check" size="lg" 
                            class="votedIcon"
                            :class="{ activeHasVotedIcon: hasVoted(member), inactiveHasVotedIcon: !hasVoted(member) }" />
                    </div>
                </div>
                <div v-show="distance > 0" class="countdown">
                    <div v-if="days >= 1" class="timeUnit">
                        <span>{{ days }}</span>
                        <p class="timeUnitName">{{ TIME_UNITS.DAYS }}</p>
                    </div>
                    <div v-if="days < 1 && hours >= 1" class="timeUnit">
                        <span>{{ hours }}</span>
                        <p class="timeUnitName">{{ TIME_UNITS.HOURS }}</p>
                    </div>
                    <div v-if="days < 1 && hours < 1 && minutes >= 1" class="timeUnit">
                        <span>{{ minutes }}</span>
                        <p class="timeUnitName">{{ TIME_UNITS.MINUTES }}</p>
                    </div>
                    <div v-if="days < 1 && hours < 1 && minutes < 1" class="timeUnit">
                        <span>{{ seconds }}</span>
                        <p class="timeUnitName">{{ TIME_UNITS.SECONDS }}</p>
                    </div>
                    <p>{{ untilVotesAreCounted }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.5s ease;
    opacity: 1;
    transform: translateY(10px);
}

.fade-up-enter-to {
    transform: translateY(0);
}

.fade-up-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.fade-up-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

p {
    color: var(--color-on-background);
    font-size: 1vw;
}

.header {
    font-size: 1.8vw;
    color: var(--color-on-background);
}

.subheader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.subheaderContainer {
    background-color: var(--color-on-primary);
    height: 1.8vw;
    padding: 0 1vw 0 1vw;
    border-radius: 1.8vw 1.8vw 0 0;
}

.subheader p {
    font-weight: bold;
}

.panel {
    height: 11.5vw;
    padding: 0.5vw 0 0 0;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
}

.memberList {
    overflow-y: scroll;
    height: 8.5vw;
}

.member {
    display: flex;
    flex-direction: row;
    position: relative;
    padding-bottom: 0.3vw;
}

.iconAndName {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 1vw;
}

.userIcon {
    padding-right: 0.5vw;
}

.votedIcon {
    position: absolute;
    right: 2.3vw;
}

.inactiveHasVotedIcon {
    color: var(--color-alt-on-background);
}

.activeHasVotedIcon {
    color: var(--color-positive);
}

.countdown {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
    height: 2.5vw;
}

.countdown p {
    font-size: 0.8vw;
}

.countdown span {
    font-weight: bold;
    font-size: 1.4vw;
    color: var(--color-on-background);
}

.timeUnit>* {
    display: flex;
    justify-content: center;
    width: 3vw;
    position: absolute;
}

.timeUnit {
    width: 3vw;
    position: relative;
}

.timeUnit span {
    top: -1.5vw;
}

</style>