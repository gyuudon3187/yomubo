<script setup lang="ts">
import type { Ref } from 'vue';

defineProps<{
  invalid: Ref<boolean> | undefined,
  message: string | undefined
}>()
</script>

<template>
  <Transition name="validation-message">
    <p :class="{ invalidText: invalid }">{{ message }}</p>
  </Transition>
</template>

<style scoped>
p {
  font-size: smaller;
}
.validation-message-enter-to {
  opacity: 1;
}

.validation-message-enter-from {
  opacity: 0;
  transform: translateY(-5px)
}

.validation-message-enter-active {
  transition: all 0.2s ease-out;
}

.validation-message-leave-to {
  opacity: 0;
  transform: translateY(-5px)
}

.validation-message-leave-active {
  transition: all 0.2s ease-in;
}
</style>