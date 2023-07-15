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
  <div >
    <label v-for="(button, index) in radioButtonProps.buttons" class="container">{{ button }}
      <input type="radio" :name="radioButtonProps.label" :value="button" v-model="radioButtonProps.input.value" :checked="isPrechecked(index)">
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
}

.container {
  display: block;
  position: relative;
  padding-left: 2vw;
  padding-right: 1vw;
  margin-bottom: 12px;
  font-size: 1.2vw;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5vw;
  width: 1.5vw;
  background-color: #dcdcdc;
  border-radius: 50%;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  transition: all 0.15s;
  background-color: #7C4200;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
 	top: 0.5vw;
	left: 0.5vw;
	width: 0.5vw;
	height: 0.5vw;
	border-radius: 50%;
	background: white;
}

/* input[type=radio] {
  accent-color: #7C4200;
}

input[type=radio]:focus {
  accent-color: #7C4200;
} */

</style>