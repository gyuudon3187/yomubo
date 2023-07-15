<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';
import { useNoteTakerStore } from '@/stores/noteTaker';
import { useClubStore } from '@/stores/club';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Quotes from './Quotes/Quotes.vue';
const { t } = useI18n();
const { quotes } = storeToRefs(useNoteTakerStore());
const { updateCurrentMeeting } = useClubStore();
const { displayAlert } = useAlertStore();

const basePath = "mainPage.clubContent.noteTaker.";
const tabsPath = basePath + "tabs.";

const TABS = {
    BOOK_REPORT: t(tabsPath + "bookReport"),
    QUOTES: t(tabsPath + "quotes")
}

const selectedTabs = ref([true, false]);
const bookReportInput = ref();

const options = {
    placeholder: t(basePath + "placeholder"),
    theme: 'snow'
}

function selectTab(selectedIndex: number) {
    selectedTabs.value = selectedTabs.value.map((_, index)  => selectedIndex === index )
}

function saveChanges() {
    updateCurrentMeeting("bookReport", bookReportInput.value);
    updateCurrentMeeting("quotes", quotes.value);
    displayAlert(t("alert.success", { msg: t("alert.operations.savedChanges") }), true);
}
</script>

<template>
    <div style="position: relative;">
        <p style="font-size: 1.8vw; color: var(--color-on-background);">Note Taker</p>
        <div class="header flexRow">
            <div class="tabs flexRow">
                <p v-for="(tab, index) in Object.values(TABS)" @click="selectTab(index)" :class="{ selectedTab: selectedTabs[index], paddingLeft: index === 0 && !selectedTabs[index]}" style="user-select: none;">
                    {{ tab }}
                </p>
            </div>
            <div>
                <button @click="saveChanges"><Icon icon="fa-solid fa-save" /> Save</button>
            </div>
        </div>
        <div class="noteTaker">
            <Transition name="fade" mode="out-in">
                <div v-if="selectedTabs[0]" class="bookReport">
                    <QuillEditor v-model:content="bookReportInput" :options="options" toolbar="minimal" style="height: 8.2vw; border-radius: 0 0 1.8vw 1.8vw;"/>
                </div>
                <Quotes v-else />
            </Transition>
        </div>
        
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.15s;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0
}

.flexRow {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.header {
    justify-content: space-between;
    background-color: var(--color-on-primary);
    height: 1.8vw;
    border-radius: 1.8vw 1.8vw 0 0;
    padding-right: 1vw;
}

.tabs {
    position:relative;
}

.tabs p {
    cursor: pointer;
}

.paddingLeft {
    padding-left: 1vw;
}

.selectedTab {
    padding: 0 1vw; 
    border-radius: 1.8vw 1.8vw 0 0; 
    background-color: var(--color-header); 
}

.noteTaker {
    height: 11.5vw;
    background-color: white;
    overflow-y: auto;
    border-radius: 0 0 1.8vw 1.8vw;
    color: var(--color-on-background)
}

.bookReport {
    height: 100%;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
}

button {
    border: none;
    border-radius: 1vw;
    cursor: pointer;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    /* width: 3.5vw; */
    transition: all 0.2s;
}

button:hover {
    transition: 120ms;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.08);
}
</style>