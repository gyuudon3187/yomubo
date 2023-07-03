<script setup lang="ts">
import Header from '@/components/LandingPage/Header.vue';
import ClubContent from '@/components/Main/Clubs/ClubContent/ClubContent.vue'
import ClubManagement from '@/components/Main/Clubs/ClubManagement/ClubManagement.vue';
import ReasonModal from '@/components/Main/Clubs/ClubContent/ReadingList/ReasonModal.vue';
import DeleteModal from '@/components/Main/Clubs/ClubContent/ReadingList/DeleteModal.vue';
import VoteResultsModal from '@/components/Main/Clubs/ClubContent/VoteResultsModal.vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
const { 
    reasonModalIsVisible, 
    deleteBookModalIsVisible, 
    voteResultsModalIsVisible } = storeToRefs(useModalStore());
</script>

<template>
    <div id="mainPage">
        <ReasonModal v-show="reasonModalIsVisible" />
        <DeleteModal v-show="deleteBookModalIsVisible" />
        <VoteResultsModal v-if="voteResultsModalIsVisible" />
        <Header style="position: fixed; width: 100%; z-index: 1;" :height="60" :width="174" />
        <div class="pad1"></div>
        <div class="test">
            <ClubManagement />
            <ClubContent />
        <div class="pad2"></div>
        </div>
    </div>
</template>

<style scoped>
#mainPage {
    width: 100%;
    height: 100%;
}

/* .mainHeader {
    padding: 0rem 3rem;
    background-color: var(--color-header);
    position: sticky;
    top: 0;
} */

.test {
    padding: 1rem 3rem;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* overflow-y: scroll; */
}

.pad1 {
    width: 100%;
    height: 4.7vw;
    /* background-color: red; */
}

.pad2 {
    width: 180px;
    height: 20px;
}

</style>

<style>
::-webkit-scrollbar {
  width: 0.4vw;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(153, 88, 88);
  border-radius: 8px;
}
</style>