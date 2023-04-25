<script setup lang="ts">
import type { MultiselectDropdownInterface, Option } from '@/types/misc';
import { ref, onMounted, onUnmounted } from 'vue';
import { assertIsNode } from '@/components/util';
import { initializeInputField } from '../util';
import InputField from '@/components/Misc/InputField.vue'
const props = defineProps<{
  multiselectProps: MultiselectDropdownInterface
}>();

const inputFieldProps = initializeInputField("placeholder", props.multiselectProps.placeholderPath);
const isVisible = ref(false);
const open = ref("");

function toggleOption(option: Option): void {
  const selectedOptions = props.multiselectProps.input.value;
  props.multiselectProps.input.value = selectedOptions.includes(option.label) ? 
                    selectedOptions.filter(selectedOption => selectedOption !== option.label) : 
                    [...selectedOptions, option.label];
  option.selected.value = !option.selected.value;
}

function filterOptions(): void {
  props.multiselectProps.options.forEach(option => {
    const firstLettersOfOption = option.label.substring(0, inputFieldProps.input.value.length);
    option.isVisible.value =  firstLettersOfOption.toUpperCase() === inputFieldProps.input.value.toUpperCase() 
                              || !inputFieldProps.input.value;
  });
}

function openDropdown(): void {
  isVisible.value = true;
  open.value = "open";
}

function closeDropdownOnOutsideClick({target}: MouseEvent): void {
  assertIsNode(target);
  if(!document.querySelector(".select-container")?.contains(target)) {
    resetFilter();
  }

  function resetFilter() {
    isVisible.value = false;
    open.value = "";
    inputFieldProps.input.value = "";
    delayResetSoThatTransitionLooksNatural();

    function delayResetSoThatTransitionLooksNatural() {
      setTimeout(filterOptions, 100);
    }
  }
}

onMounted(() => {
  window.addEventListener("mousedown", closeDropdownOnOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener("mousedown", closeDropdownOnOutsideClick);
})

</script>

<template>
  <div :id="multiselectProps.id" class="select-container">
    <div @mousedown="openDropdown()" class="select-btn">
      <InputField @input="filterOptions()" :inputProps="inputFieldProps" />
      <span class="arrow-dwn" :class="open">
        <Icon icon="fa-solid fa-chevron-down" />
      </span>
      
    </div>

    <Transition name="fade">
      <div v-show="isVisible" class="list">
        <ul class="list-items">
          <li 
            v-for="option in multiselectProps.options" 
            v-show="option.isVisible.value" 
            @click="toggleOption(option)" 
            class="item" >

            <span class="checkbox">
              <Icon icon="fa-solid fa-check" :class="{ selected: option.selected.value, unselected: !option.selected.value}" />
            </span>
            <span class="item-text" >{{ option.label }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.select-container {
  border-radius: 8px;
  position: relative;
  max-width: 320px;
  width: 100%;
}

.select-btn .btn-text {
  font-size: 17px;
  font-weight: 400;
}

.select-btn .arrow-dwn {
  top: 5px;
  right: 25px;
  align-items: center;
  display: flex;
  font-size: 14px;
  height: 21px;
  justify-content: center;
  position: absolute;
  transition: 0.3s;
  pointer-events: none;
  width: 21px;
}

.open {
  transform: rotate(-180deg)
}

.list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  height: auto;
  margin-top: 15px;
  overflow: auto;
  padding: 16px 16px 0px;
  position: absolute;
  user-select: none;
  width: 200px;
  max-height: 200px;
  z-index: 2;
}

.list::-webkit-scrollbar {
  width: 0.4vw;
}

.list::-webkit-scrollbar-thumb {
  background-color: rgb(153, 88, 88);
  border-radius: 8px;
}

.list-items {
  padding: 0;
}

.list-items .item {
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  height: 35px;
  list-style: none;
  padding: 0 8px;
  transition: 0.3s;
}

.list-items .item:hover {
  background-color: #fefbe7;
}

.item .item-text {
  font-size: 16px;
  font-weight: 400;
}

.item .checkbox {
  align-items: center;
  border: 1.5px solid #c0c0c0;
  border-radius: 4px;
  display: flex;
  height: 16px;
  justify-content: center;
  margin-right: 12px;
  transition: all 0.3s ease-in-out;
  width: 16px;
}

.selected {
  transform: scale(1);
}

.unselected {
  transform: scale(0);
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.1s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.1s ease-in;
}

</style>