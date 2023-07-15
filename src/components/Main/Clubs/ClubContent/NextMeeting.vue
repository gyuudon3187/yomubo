<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClubStore } from '@/stores/club';
import { 
    initializeRadioButton,
    initializeDatePicker,
    initializeLocationPicker,
    isRadioButton,
    isDatePicker,
    isLocationPicker,
    getLabelPath,
    Stage } from '@/components/util';
import type {
    DatePickerInterface,
    RadioButtonInterface,
    InputComponent,
    LocationPickerInterface
} from '@/types/misc'
import { useI18n } from 'vue-i18n';
import { ref, watch, computed, type Ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import RadioButton from '@/components/Misc/RadioButton.vue';
const { t } = useI18n();
const clubStore = useClubStore();
const { clubs, isClubOwner, selectedClub, currentMeeting, selectedClubIndex } = storeToRefs(clubStore);

interface TitleAndDescription {
    title: string,
    description: string | InputComponent
}

const basePath = "mainPage.clubContent.nextMeeting.";
const typePath = basePath + "type.";
const meetingDatePath = basePath + "meetingDate.";
const votingDeadlineTitlePath = basePath + "votingDeadline.";
const locationPath = basePath + "location.";
const typeLabelPath = getLabelPath(typePath);
const meetingDateLabelPath = getLabelPath(meetingDatePath);
const votingDeadlineLabelPath = getLabelPath(votingDeadlineTitlePath);
const locationLabelPath = getLabelPath(locationPath);
const isMeetingDate = (label: string) => label === t(meetingDatePath + "label");

const typeInput = ref(currentMeeting.value.type);
const meetingDateInput = ref(new Date(currentMeeting.value.date));
const votingDeadlineInput = ref(new Date(currentMeeting.value.votingDeadline));
const locationInput = ref(currentMeeting.value.location);

const titlesAndDescriptionsForMembers: TitleAndDescription[] = [
    { title: t(typeLabelPath), description: currentMeeting.value.type },
    { title: t(meetingDateLabelPath), description: new Date(currentMeeting.value.date).toLocaleString().slice(0, 16) },
    { title: t(votingDeadlineLabelPath), description: new Date(currentMeeting.value.votingDeadline).toLocaleString().slice(0, 16)},
    { title: t(locationLabelPath), description: currentMeeting.value.location },
]

const titlesAndDescriptionsForClubOwner: TitleAndDescription[] = [...initializeProps()]

const minDate = ref(new Date());
setInterval(() => {
    const currentTime = new Date().getTime();
    if(minDate.value.getTime() < currentTime) {
        minDate.value = new Date(currentTime);
    }
}, 1000 * 60)

watch(
    [
        meetingDateInput,
        votingDeadlineInput,
        () => currentMeeting.value.date,
        () => currentMeeting.value.votingDeadline
    ], 
    (
        [newDate, newDeadline, newStringDate, newStringDeadline], 
        [prevDate, prevDeadline, prevStringDate, prevStringDeadline]) => {

        if(newDate !== prevDate) updateDateOrDeadline("date", meetingDateInput.value);
        if(newDeadline !== prevDeadline) updateDateOrDeadline("votingDeadline", votingDeadlineInput.value);
        if(newStringDate !== prevStringDate) updateStringDateOrDeadline(newStringDate, meetingDateInput)
        if(newStringDeadline !== prevStringDeadline) updateStringDateOrDeadline(newStringDeadline, votingDeadlineInput)

        function updateDateOrDeadline(key: "date" | "votingDeadline", value: Date): void {
            clubStore.updateCurrentMeeting(key, value.toJSON());
        }

        function updateStringDateOrDeadline(stringDate: string, ref: Ref<Date>) {
            ref.value = new Date(stringDate)
        }
    }
)

function initializeProps() {

    enum InputId {
        Type = "meetingType",
        MeetingDate = "meetingDate",
        VotingDeadline = "meetingVotingDeadline",
        Location = "meetingLocation"
    }

    return [
        initializeTypes(),
        initializeMeetingDate(),
        initializeVotingDeadline(),
        initializeLocation()
    ]

    function initializeTypes(): TitleAndDescription {   
        const typeNames = ["online", "physical"];
        const checkedIndex = typeNames.indexOf("online");

        const radioButtonProps = initializeRadioButton(InputId.Type, typePath, typeNames, typeInput, undefined, checkedIndex);

        return {
            title: radioButtonProps.label,
            description: radioButtonProps
        }
    }

    function initializeMeetingDate(): TitleAndDescription {
        const datePickerProps = initializeDatePicker(InputId.MeetingDate, meetingDatePath, meetingDateInput);

        return {
            title: datePickerProps.label,
            description: datePickerProps
        }
    }

    function initializeVotingDeadline(): TitleAndDescription {
        const datePickerProps = initializeDatePicker(InputId.VotingDeadline, votingDeadlineTitlePath, votingDeadlineInput);

        return {
            title: datePickerProps.label,
            description: datePickerProps
        }
    }

    function initializeLocation(): TitleAndDescription {
        const locationPickerProps = initializeLocationPicker(InputId.Location, locationPath, locationInput);

        return {
            title: locationPickerProps.label,
            description: locationPickerProps
        }
    }
}
</script>

<template>
    <div>
        <p style="font-size: 1.8vw; color: var(--color-on-background)">Next Meeting</p>
        <div class="nextMeeting">
            <div class="header">
                <p>Meeting #1</p>
            </div>
            <div v-if="!isClubOwner" class="nextMeetingContent">
                <div v-for="titleAndDescription in titlesAndDescriptionsForMembers" class="titleAndDescription">
                    <p style="color: var(--color-on-background)">
                        {{ titleAndDescription.title }}
                    </p>
                    <p v-if="!isClubOwner" style="color: var(--color-alt-on-background);">
                        {{ titleAndDescription.description }}
                    </p>
                </div>
            </div>
            <div v-if="isClubOwner" class="nextMeetingContent">
                <div v-for="titleAndDescription in titlesAndDescriptionsForClubOwner" class="titleAndDescription">
                    <p v-if="titleAndDescription.title !== t(votingDeadlineLabelPath) || currentMeeting.stage !== Stage.Reading" style="color: var(--color-on-background)">
                        {{ titleAndDescription.title  }}
                    </p>
                    <div v-if="isRadioButton(titleAndDescription.description as InputComponent)" class="radioButtons">
                        <RadioButton
                            style="transform: scale(0.8); position: absolute; left: -1.3vw" :radio-button-props="(titleAndDescription.description as RadioButtonInterface)">
                        </RadioButton>
                    </div>
                    <VueDatePicker v-else-if="isDatePicker(titleAndDescription.description as InputComponent) &&
                                              isMeetingDate((<DatePickerInterface>titleAndDescription.description).label)"
                        hide-input-icon
                        prevent-min-max-navigation
                        input-class-name="dp-custom-input"
                        calendar-cell-class-name="dp-custom-menu"
                        :min-date="votingDeadlineInput"
                        :teleport="true"
                        v-model="meetingDateInput" >
                    </VueDatePicker>
                    <VueDatePicker v-else-if="isDatePicker(titleAndDescription.description as InputComponent) &&
                                             !isMeetingDate((<DatePickerInterface>titleAndDescription.description).label) &&
                                             currentMeeting.stage !== Stage.Reading"
                        hide-input-icon
                        prevent-min-max-navigation
                        input-class-name="dp-custom-input"
                        calendar-cell-class-name="dp-custom-menu"
                        :min-date="minDate"
                        :teleport="true"
                        v-model="votingDeadlineInput" >
                    </VueDatePicker>
                    <input v-else-if="isLocationPicker(titleAndDescription.description as InputComponent)"
                        v-model="(<LocationPickerInterface>titleAndDescription.description).data.value"
                        style="height: 1.5vw; width: 9.1vw"
                        class="location"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    color: var(--color-on-background);
    font-size: 1vw;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-on-primary);
    height: 1.8vw;
    padding: 0 1vw 0 1vw;
    width: 13vw;
    border-radius: 1.8vw 1.8vw 0 0;
}

.header p {
    font-weight: bold;
}

.nextMeetingContent {
    height: 11.5vw;
    padding: 0.5vw 2.5vw 0 1vw;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
    overflow-x: hidden;
    overflow-y: scroll;
}

.titleAndDescription {
    font-size: smaller;
    padding-bottom: 0.5vw;
}

.titleAndDescription p {
    color: var(--color-alt-on-background);
}

.radioButtons {
    display: flex;
    flex-direction: row;
    font-size: smaller;
    position: relative;
    height: 1.5vw;
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