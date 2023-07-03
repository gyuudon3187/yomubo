<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UserMenu from "../Main/UserMenu.vue";

const authStore = useAuthStore();

defineProps<{
  height: number,
  width: number
}>();
</script>

<template>
  <div>
    <header >
      <div style="display: flex; flex-direction: row; " :class="{mainHeader: authStore.isAuthenticated}">
        <img
          alt="YomuBo logo"
          :class="{logo: !authStore.isAuthenticated}"
          src="@/assets/logo.svg"
          :width="width"
          :height="height"
        />

        <nav :class="{mainNav: authStore.isAuthenticated, landingNav: !authStore.isAuthenticated}">
          <RouterLink to="/">{{ $t("landingPage.nav.home") }}</RouterLink>
          <RouterLink to="/#how-it-works" v-if="!authStore.isAuthenticated" style="color: var(--color-text);">How it works</RouterLink>
          <RouterLink to="/clubs" v-if="authStore.isAuthenticated">Clubs</RouterLink>
          <RouterLink to="/books" v-if="authStore.isAuthenticated">Books</RouterLink>
          <RouterLink to="/about">{{ $t("landingPage.nav.about") }}</RouterLink>
        </nav>

        <UserMenu v-if="authStore.isAuthenticated"/>
      </div>
    </header>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  /* width: 100%; */
}

.invisiblePad {
  height: 80px;
  width: 100%;
  position: absolute;
}

.logo {
  display: block;
}

.router-view {
  padding-top: 50px;
}

.route-enter-from {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.1s ease-out;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.1s ease-in;
}

nav {
  width: 100%;
  font-size: 12px;
}

nav a.router-link-exact-active {
  color: var(--color-text-active);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .mainHeader {
    padding: 0 3rem;
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    width: 100%;
    background-color: var(--color-header);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    font-size: 1rem;
    margin-top: 4.4rem;
  }
  
  nav a {
    font-weight: bold;
  }

  .mainNav {
    display: flex; 
    align-items: center; 
    justify-content: center;
    margin-top: 0;
  }
}
</style>