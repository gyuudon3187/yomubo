<script setup lang="ts">
import Header from '@/components/LandingPage/Header.vue';
import ClubContent from '@/components/Main/Clubs/ClubContent/ClubContent.vue'
import ClubManagement from '@/components/Main/Clubs/ClubManagement/ClubManagement.vue';

</script>

<template>
    <div id="mainPage">
        <Header :height="60" :width="174" />
        <div class="test">
            <ClubManagement />
            <ClubContent />
            <div class="pad"></div>
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
    padding: 2.5rem 3rem;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.pad {
    width: 180px;
    height: 20px;
}

.line {
    height: 1.5px;
    width: 100%;
    position: absolute;
    bottom: 5px;
    background-color: var(--color-border);
}

.line-2 {
    height: 1.5px;
    width: 55%;
    position: absolute;
    bottom: 0px;
    background-color: var(--color-border);
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