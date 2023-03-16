<script setup lang="ts">
import type { RadioButtonInterface } from '@/types/misc';
const props = defineProps<{
  radioButtonProps: RadioButtonInterface
}>()

function isPrechecked(index: number): boolean {
  return props.radioButtonProps?.checkedIndex === index;
}
</script>

<template>
  <div v-for="(button, index) in radioButtonProps.buttons">
    <input v-if="isPrechecked(index)" type="radio" :name="radioButtonProps.label" :value="button" checked>
    <input v-else type="radio" :name="radioButtonProps.label" :value="button">
    <label :for="radioButtonProps.label">{{ button }}</label>
  </div>
</template>

<style scoped>
div {
  display: inline-block;
  margin-right: 10px
}

input[type=radio] {
  accent-color: #7C4200;
}

input[type=radio]:focus {
  accent-color: #7C4200;
}

</style>