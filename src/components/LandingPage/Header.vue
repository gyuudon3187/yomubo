<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <img
        alt="YomuBo logo"
        class="logo"
        src="@/assets/logo.svg"
        width="347"
        height="119"
    />

    <div class="wrapper">
        <nav>
        <RouterLink to="/">{{ $t("landingPage.nav.home") }}</RouterLink>
        <RouterLink to="/about">{{ $t("landingPage.nav.about") }}</RouterLink>
        </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 2rem;
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
  text-align: center;
  margin-top: 2rem;
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
  header {
    display: flex;
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
}
</style>