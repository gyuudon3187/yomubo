<script setup lang="ts">
import { RouterView } from "vue-router";
import RegistrationModal from "@/components/LandingPage/RegistrationModal.vue";
import Background from "../../components/LandingPage/Background/Background.vue";
import Header from "../../components/LandingPage/Header.vue";
import { useModalStore } from "@/stores/modal";
const modal = useModalStore();

</script>

<template>
  <div class="test">
    <RegistrationModal v-show="modal.isVisible"/>
    <div id="landingPage">
      <Background />

      <div class="main">
        <Header :height="119" :width="347" />
        <RouterView class="router-view" v-slot="{ Component }">
          <Transition name="route" mode="out-in">
            <Component :is="Component"></Component>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test {
  /* margin: auto; */
}

#landingPage {
  padding: 2rem 3rem;
  width: 1280px;
  height: 1600px;
  background-color: var(--color-header);
}

.main {
  z-index: 1;
  display: grid;
  grid-template-rows: 0.6fr 0.6fr;
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
</style>
