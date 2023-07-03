<script setup lang="ts">
import { ref } from 'vue';

const lampIsVisible = ref(false);
const guyDrinkingCoffeeIsVisible = ref(false);

setTimeout(() => lampIsVisible.value = true, 200);
setTimeout(() => guyDrinkingCoffeeIsVisible.value = true, 500)
</script>

<template>
  <Transition v-show="lampIsVisible" name="expand-down">
    <img
        alt="Lamp light"
        class="lamp-light"
        width="5866"
        height="2168"
        src="@/assets/lampLight.svg"
      />
  </Transition>
    <img
      alt="Lamp"
      class="lamp"
      width="120"
      height="370"
      src="@/assets/lamp.svg"
    />

    <Transition v-show="guyDrinkingCoffeeIsVisible" name="fade">
      <img
        alt="Guy reading book"
        class="books-n-coffee"
        width="531"
        height="398"
        src="@/assets/readBookWhileDrinkingCoffee.png"
      />
    </Transition>
</template>

<style scoped>
.expand-down-enter-active,
.expand-down-leave-active {
    transition: height 2s ease;
}

.expand-down-enter-from,
.expand-down-leave-to {
    height: 0px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 3s ease-out;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    transition: all 2s ease-in;
    opacity: 0;
}


.books-n-coffee {
  position: absolute;
  left: 42rem;
  top: 11rem
}

.lamp {
  position: absolute;
  left: 60rem;
  top: -8rem;
}

.lamp-light {
  position: absolute;
  left: -1911px;
  top: 116px;
}
</style>