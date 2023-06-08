<script setup lang="ts">
import LandingPage from "./views/LandingPage/LandingPageView.vue"
import { useAuthStore } from "@/stores/auth"
import MainPage from "./views/MainPage/MainView.vue";
const { listenToAuthChanges } = useAuthStore();

const isAuthenticated = await listenToAuthChanges();

</script>

<template>
  <MainPage v-if="isAuthenticated" />
  <LandingPage v-else />
</template>

<style scoped>
.landing-page {
  width: 100%; /* Remove to get back centered landing page */
  background-color: var(--color-header);
}
</style>
