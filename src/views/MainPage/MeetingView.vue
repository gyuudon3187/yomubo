<script setup lang="ts">
import Button from '@/components/Misc/Button.vue';
import RadioButton from '@/components/Misc/RadioButton.vue';
import Book from '@/components/Main/Clubs/ClubContent/Book/Book.vue';
import Votes from '@/components/Main/Clubs/ClubContent/Votes.vue';
import ReadingList from '@/components/Main/Clubs/ClubContent/ReadingList/ReadingList.vue';
import NextMeeting from '@/components/Main/Clubs/ClubContent/NextMeeting.vue'
import NoteTaker from '@/components/Main/Clubs/ClubContent/NoteTaker/NoteTaker.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Stage, initializeButton, initializeRadioButton, getLabelPath } from '@/components/util';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useClubStore } from '@/stores/club';
import { storeToRefs } from 'pinia';
const clubStore = useClubStore();
const { isClubOwner } = storeToRefs(clubStore);
const { t } = useI18n();

const clubContentPath = "mainPage.clubContent.";
const nextMeetingPath = clubContentPath + "nextMeeting.";
const meetingTypePath = nextMeetingPath + "type.";
const meetingDatePath = nextMeetingPath + "meetingDate.";
const votingDeadlinePath = nextMeetingPath + "votingDeadline.";
const locationPath = nextMeetingPath + "location.";
const linkPath = nextMeetingPath + "link.";
const stagePath = clubContentPath + "startStage."
const clubOwnerPath = stagePath + "clubOwner.";

const START = {
    TITLES: {
        TYPE: t(getLabelPath(meetingTypePath)),
        MEETING_DATE: t(getLabelPath(meetingDatePath)),
        VOTING_DEADLINE: t(getLabelPath(votingDeadlinePath)),
        LOCATION: t(getLabelPath(locationPath)),
        LINK: t(getLabelPath(linkPath))
    },
    PROPS: {
        RADIO_BUTTON: meetingTypePath,
        BUTTON: clubOwnerPath + "nextStageButton"
    },
    UTIL: {
        RADIO_BUTTON_ONLINE: t(meetingTypePath + "online")
    },
    WAITING: t(stagePath + "waiting"),
    SETUP: t(stagePath + "setup")
}

const radioButtonInput = ref(START.UTIL.RADIO_BUTTON_ONLINE);
const date = ref(new Date());

const radioButtonProps = initializeRadioButton("startTypeRadioButton", START.PROPS.RADIO_BUTTON, ["online", "physical"], radioButtonInput, undefined, 0)
const nextButtonProps = initializeButton(START.PROPS.BUTTON, "primary", () => clubStore.updateCurrentMeeting("stage", Stage.Voting))
</script>

<template>
    <div v-if="clubStore.isInStage(Stage.Start)" class="clubContent">
            <div v-if="isClubOwner" class="preparingMeeting">
                <h1 style="text-align: center;">{{ START.SETUP }}</h1>
                <div class="titleAndDescription">
                    <p>{{ START.TITLES.TYPE }}</p>
                    <RadioButton :radio-button-props="radioButtonProps" />
                </div>
                <div class="titleAndDescription">
                    <p>{{ START.TITLES.MEETING_DATE }}</p>
                    <VueDatePicker v-model="date"></VueDatePicker>
                </div>
                <div class="titleAndDescription">
                    <p>{{ START.TITLES.VOTING_DEADLINE }}</p>
                    <VueDatePicker v-model="date"></VueDatePicker>
                </div>
                <div class="titleAndDescription">
                    <p>{{ radioButtonInput === START.UTIL.RADIO_BUTTON_ONLINE ? START.TITLES.LINK : START.TITLES.LOCATION }}</p>
                    <input class="location" />
                </div>
                <div style="width: 100%; display: flex; justify-content: flex-end;">
                    <Button :button-props="nextButtonProps" />
                </div>
                
            </div>
            <div v-else class="waiting">
                <p>{{ START.WAITING }}</p>
            </div>
        </div>
        <div v-else-if="clubStore.isInStage(Stage.Voting) || clubStore.isInStage(Stage.Reading)" class="clubContent votingStage">
            <Book />
            <Votes />
            <ReadingList v-if="clubStore.isInStage(Stage.Voting)" />
            <NoteTaker v-else />
            <NextMeeting />
        </div>
        
</template>

<style scoped>
.pad {
    width: 180px;
    height: 20px;
}

.preparingMeeting {
    color: var(--color-on-background);
}

.waiting {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
    color: var(--color-on-background);
    font-size: 2vw;
}

.titleAndDescription {
    padding-bottom: 1vw;
}

.titleAndDescription p {
    font-weight: bold;
}

.location {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 6px 30px 6px 12px;
    color: var(--color-on-background);
    box-sizing: border-box;
}

.votingStage {
    display: grid;
    grid-template-columns: 35vw 13vw;
    grid-auto-rows: 16.4vw;
    grid-column-gap: 2vw;
    grid-row-gap: 2.5vw;
}

</style>