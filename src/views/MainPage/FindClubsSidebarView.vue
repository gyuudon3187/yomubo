<script setup lang="ts">
import RadioButton from '@/components/Misc/RadioButton.vue'
import Dropdown from '@/components/Misc/Dropdown.vue'
import { getLabelPath, initializeRadioButton, initializeDropdown, initializeClubAccordionItems } from '@/components/util';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useSearchClubStore } from '@/stores/searchClub';
import type { Club } from '@/types/misc';
const { clubs, searchResults } = storeToRefs(useSearchClubStore());
const { t } = useI18n();

const searchBarInput = ref("");

const basePath = "mainPage.sidebars.findClubs.";
const typeNames = ["online", "physical"];

const TYPE = {
    ID: "findClubType",
    PATH: basePath + "type.",
    NAMES: typeNames,
    INPUT: ref(<"Any" | "Online" | "Physical"> "Any"),
    CHECKED_INDEX: typeNames.indexOf("online")
}

const LANGUAGE = {
    ID: "findClubLanguage",
    PATH: basePath + "language.",
    OPTION_NAMES: ["Any", "Japanese", "Swedish", "English"],
    INPUT: ref("Any"),
}

const GENRES = {
    ID: "findClubGenres",
    PATH: basePath + "genres.",
    OPTION_NAMES: ["Classics", "Mystery", "Horror"],
    INPUT: ref([]),
    MULTISELECT: true
}

const radioButtonProps = initializeRadioButton(TYPE.ID, TYPE.PATH, TYPE.NAMES, TYPE.INPUT, undefined, TYPE.CHECKED_INDEX);
const dropdownProps = initializeDropdown(LANGUAGE.ID, LANGUAGE.PATH, LANGUAGE.OPTION_NAMES, LANGUAGE.INPUT)
const multiselectProps = initializeDropdown(GENRES.ID, GENRES.PATH, GENRES.OPTION_NAMES, GENRES.INPUT, undefined, GENRES.MULTISELECT);

function searchClubsOnEnter(e: KeyboardEvent) {
    if(e.key === "Enter") searchClubs(
        searchBarInput.value,
        TYPE.INPUT.value,
        LANGUAGE.INPUT.value, 
        GENRES.INPUT.value
    )
}

function searchClubs(clubName?: string, 
                     meetingType?: "Any" | "Online" | "Physical", 
                     language?: string, 
                     genres?: string[]) {
    const filters = [
        filterByClubName,
        filterByMeetingType,
        filterByLanguage,
        filterByGenres
    ]
    const filteredClubs = clubs.value.filter(club => filters.every(filter => filter(club)));
    clubs.value.forEach(club => console.log(filters.every(filter => filter(club))));
    searchResults.value = initializeClubAccordionItems(filteredClubs);

    function filterByClubName(club: Club) {
        return club.label.toLocaleUpperCase().includes(clubName?.substring(0, clubName.length).toLocaleUpperCase() ?? "");
    }

    function filterByMeetingType(club: Club) {
        return meetingType ? club.meetingType === meetingType || meetingType === "Any" : true;
    }

    function filterByLanguage(club: Club) {
        return language ? club.language === language || language === "Any" : true;
    }

    function filterByGenres(club: Club) {
        console.log(genres)
        console.log(genres?.some(genre => club.genre === genre) ?? true)
        return (genres?.some(genre => club.genre === genre) ?? true) || genres?.length === 0;
    }
}
</script>

<template>
    <div>
        <div class="findClubsTitle">
            <p style="color: var(--color-on-background)">Find Clubs</p>
            <div class="line"></div>
        </div>
        <div class="findClubs">
            <input v-model="searchBarInput" @keypress="searchClubsOnEnter" class="input-field">
            <p>Meeting Type</p>
            <RadioButton :radio-button-props="radioButtonProps" />
            <p>Languages</p>
            <Dropdown :dropdown-props="dropdownProps" />
            <p>Genres</p>
            <Dropdown :dropdown-props="multiselectProps" />
        </div>
    </div>
</template>

<style scoped>
.findClubsTitle {
    font-size: 2vw;
    bottom: -0.6vw;
    position: relative;
}

.findClubs {
    width: 14.05vw;
    height: 80vw;
    overflow-y: auto;
    margin-top: 2vw;
    color: var(--color-on-background);
}

.line {
    height: 1.5px;
    width: 55%;
    position: absolute;
    bottom: 0px;
    background-color: var(--color-border);
}

.input-field {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    outline: none;
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 150px;
    height: 30px;
    color: var(--color-on-background);
    box-sizing: border-box;
    padding: 0 0 0 6px;
}

.input-field:hover, .input-field:focus, .input-field:active {
    border-color: #aaaeb7;
}
</style>