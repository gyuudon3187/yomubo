<script setup lang="ts">
import type { InputFieldInterface } from '@/types/misc';
import { validate, touch, untouch, reset } from '@/util/validation'
import { watchEffect } from 'vue';
import ValidationMessage from './ValidationMessage.vue';
const props = defineProps<{
    inputProps: InputFieldInterface
}>();

function isPassword(): string {
  return props.inputProps.password ? "password" : "text";
}

function dirtyAndError(): boolean | undefined {
  return props.inputProps.validation?.dirty.value && props.inputProps.validation.error.value
}

</script>

<template>
  <div>

    <input 
      @blur="touch(inputProps.validation); validate($event, inputProps.validation);"
      @focus="untouch(inputProps.validation)"
      :type="isPassword()"
      :class="{filled: inputProps.input.value, neutral: !dirtyAndError(), invalid: dirtyAndError()}" 
      v-model="inputProps.input.value"/>

    <label class="label" :class="{ filled: inputProps.input.value, inactive: !dirtyAndError(), invalidText: dirtyAndError() }">
      {{ inputProps.label }}
    </label>
    <ValidationMessage v-if="!!inputProps.validation" v-show="dirtyAndError()" :invalid="inputProps.validation.error" :message="inputProps.validation?.displayMessage.value" />

  </div>
</template>

<style scoped>
@import '@/util/validation.css';

input {
  border-radius: 5px;
  height: 2rem;
  outline: none;
  padding-left: 1rem;
  transition: all .3s;
}

input:focus+.label,
.filled:focus+.label {
    top: -10px;
    font-size: 14px;
}

.filled:focus.neutral+.label, 
.neutral:focus+.label {
  color:#7C4200;
}

.neutral {
    background: var(--color-input);
    border: 2px solid var(--color-header);
}

.neutral:focus {
    border: 2px solid #7C4200;
}

.filled+.label {
    top: -10px;
    color:#cb9b68;
    font-size: 14px;
}

.label {
    position: absolute;
    left: 10px;
    top: 5px;
    transition: all 0.2s;
    padding: 0.2px;
    pointer-events: none;
    z-index: 1;
}

.label::before {
    content: "";
    height: 5px;
    background-color: var(--color-input);
    position: absolute;
    left: 0;
    top: 10px;
    width: 100%;
    z-index: -1;
}

.inactive {
  color: var(--color-text-inactive);
}
</style>