<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { DropdownInterface, Option } from '@/types/misc';
import { assertIsNode, initializeInputField } from '../util';
const props = defineProps<{
  dropdownProps: DropdownInterface
}>();

const isVisible = ref(false);
const open = ref("");
const inputFieldProps = initializeInputField("placeholder", props.dropdownProps.placeholderPath);
const selectedOptionsCount = computed(() => props.dropdownProps.input.value.length)

function selectOption(option: Option): void {
    props.dropdownProps.input.value = option.label;
    props.dropdownProps.options.forEach(otherOption => otherOption.selected.value = option === otherOption);
    isVisible.value = false;
    open.value = ""
}

function toggleOption(option: Option): void {
    const selectedOptions = props.dropdownProps.input.value as string[];
    props.dropdownProps.input.value = selectedOptions.includes(option.label) ? 
                        selectedOptions.filter(selectedOption => selectedOption !== option.label) : 
                        [...selectedOptions, option.label];
    option.selected.value = !option.selected.value;
}

function filterOptions(): void {
    props.dropdownProps.options.forEach(option => {
        const firstLettersOfOption = option.label.substring(0, inputFieldProps.input.value.length);
        option.isVisible.value =  firstLettersOfOption.toUpperCase() === inputFieldProps.input.value.toUpperCase() 
                                || !inputFieldProps.input.value;
    });
}

function openDropdown(e: MouseEvent): void {
    
    if(open.value === "") {
        isVisible.value = true;
        open.value = "open";
    } else {
        if(!props.dropdownProps.multiselect) closeDropdownOnClickOnInputField(e);
    }

    function closeDropdownOnClickOnInputField({target}: MouseEvent): void {
        const el = document.querySelector("#" + props.dropdownProps.id)
        assertIsNode(target);
        if(el?.contains(target)) {
            closeDropdown();
        }
        
    }

}

function closeDropdownOnOutsideClick({target}: MouseEvent): void {
  assertIsNode(target);
  const dropdownEl = document.querySelector("#" + props.dropdownProps.id);

  if(!dropdownEl?.contains(target)) {
    props.dropdownProps.multiselect ? resetFilter() : closeDropdown();
  }

  function resetFilter() {
    closeDropdown();
    inputFieldProps.input.value = "";
    delayResetSoThatTransitionLooksNatural();

    function delayResetSoThatTransitionLooksNatural() {
      setTimeout(filterOptions, 100);
    }
  }
}

function closeDropdown() {
    isVisible.value = false;
    open.value = "";
}

onMounted(() => {
  window.addEventListener("mousedown", closeDropdownOnOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener("mousedown", closeDropdownOnOutsideClick);
})
</script>

<template>
    <div :id="dropdownProps.id" class="dropdown-container">
        <div @mousedown="openDropdown" class="select-btn">
            <div v-if="!dropdownProps.multiselect" style="cursor: pointer" class="input-field">
                <p>{{ dropdownProps.input.value }}</p>
            </div>
            <div v-else>
                <input class="input-field" @input="filterOptions" v-model="inputFieldProps.input.value" />
                <label v-show="selectedOptionsCount > 0">{{ dropdownProps.input.value.length + ' options' }}</label>
            </div>
            <span class="arrow-dwn" :class="open">
                <Icon icon="fa-solid fa-chevron-down" />
            </span>
        </div>

        <Transition name="fade">
            <div v-show="isVisible" class="list">
                <ul class="list-items">
                    <li 
                        v-for="option in dropdownProps.options"
                        v-show="option.isVisible.value" 
                        @click="dropdownProps.multiselect ? toggleOption(option) : selectOption(option)" 
                        class="item" >

                        <span v-if="dropdownProps.multiselect" class="checkbox">
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
.dropdown-container {
  border-radius: 8px;
  position: relative;
  max-width: 320px;
  /* background-color: red; */
  width: 100%;
}

.input-field {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    outline: none;
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 150px;
    height: 30px;
    color: var(--color-on-background);
    box-sizing: border-box;
    padding: 0 0 0 6px;
}

.input-field:hover, .input-field:focus, .input-field:active {
    border-color: #aaaeb7;
}

label {
    background-color: var(--color-alt-on-background);
    color: white;
    border-radius: 0.5vw;
    padding: 0 0.3vw;
    position: absolute;
    top: 3px;
    left: 5px
}

.select-btn .btn-text {
  font-size: 17px;
  font-weight: 400;
}

.select-btn .arrow-dwn {
  top: 5px;
  right: 35px;
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
    /* display: flex; */
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    height: auto;
    left: 2px;
    margin-top: 15px;
    overflow: auto;
    padding: 6px 6px 6px;
    position: absolute;
    user-select: none;
    width: 150px;
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
  width: 100%;
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