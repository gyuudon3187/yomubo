<script setup lang="ts">
import type { ButtonInterface } from "@/types/misc";
import { RouterView } from "vue-router";
import RegistrationModal from "@/components/LandingPage/RegistrationModal.vue";
import Modal from "../../components/Misc/Modal.vue";
import Background from "../../components/LandingPage/Background/Background.vue";
import Header from "../../components/LandingPage/Header.vue";
import { useModalStore } from "@/stores/modal";
import { useI18n } from "vue-i18n";
const modal = useModalStore();
const { t } = useI18n();

</script>

<template>
  <RegistrationModal v-show="modal.isVisible"/>
  <div id="landingPage">
    <Background />

    <div class="main">
      <Header />
      <RouterView class="router-view" v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <Component :is="Component"></Component>
        </Transition>
      </RouterView>
      </div>
    </div>
</template>

<style scoped>
#landingPage {
  padding: 2rem 3rem;
  width: 1263px;
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
