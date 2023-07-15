<script setup lang="ts">
import Header from '@/components/LandingPage/Header.vue';
import ClubContent from '@/components/Main/Clubs/ClubContent/ClubContent.vue'
import ClubManagement from '@/components/Main/Clubs/ClubManagement/ClubManagement.vue';
import ReasonModal from '@/components/Main/Clubs/ClubContent/ReadingList/ReasonModal.vue';
import DeleteModal from '@/components/Main/Clubs/ClubContent/ReadingList/DeleteModal.vue';
import VoteResultsModal from '@/components/Main/Clubs/ClubContent/VoteResultsModal.vue';
import Alert from '@/components/Misc/Alert.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';
const router = useRouter();
const { 
    reasonModalIsVisible, 
    deleteBookModalIsVisible, 
    voteResultsModalIsVisible } = storeToRefs(useModalStore());
const { alertIsVisible } = storeToRefs(useAlertStore());

const names = ['MyClubsSidebarView', 'FindClubsSidebarView', 'CreateClubSidebarView', 'default']

router.push({
    name: 'home'
})
</script>

<template>
    <div id="mainPage">
        <ReasonModal v-show="reasonModalIsVisible" />
        <DeleteModal v-show="deleteBookModalIsVisible" />
        <VoteResultsModal v-if="voteResultsModalIsVisible" />
        <Alert v-show="alertIsVisible" class="warning"/>
        <Header style="position: fixed; width: 100%; z-index: 1;" :height="60" :width="174" />
        <div class="pad1"></div>
        <div class="container">
            <RouterView v-for="name in names" :name="name"/>
            <!-- <RouterView v-for="name in names" :name="name" mode="out-in" v-slot="{ Component }">
                <Transition name="route" mode="out-in">
                    <Component :is="Component"></Component>
                </Transition>
            </RouterView> -->
        </div>
    </div>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
}

.route-enter-active {
  transition: all 1s ease-out;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 1s ease-in;
}

#mainPage {
    width: 100%;
    height: 100%;
}

.container {
    padding: 1rem 3rem;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* overflow-y: scroll; */
}

.warning {
    top: 8vw;
    right: 2vw;
    position: absolute;
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