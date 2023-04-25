<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
const loading = useLoadingStore();
</script>

<template>
  <div v-show="loading.isVisible">
    <Transition name="fade">
      <div class="background">
        <img src="@/assets/spin.gif">
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.background {
  background-color: rgba(255, 224, 167, 0.242);
  border-radius: 20px;
  height: 100%;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 2;
}

img {
  margin-top: 8rem;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}

</style>