<script setup lang="ts">
import type {
  ButtonInterface, 
  InputComponentGroup} from '@/types/misc';
import { 
  isInputField,
  isRadioButton,
  isMultiselectDropdown} from '@/components/util'
import Button from '@/components/Misc/Button.vue';
import Input from '@/components/Misc/InputField.vue';
import RadioButton from '@/components/Misc/RadioButton.vue';
import MultiselectDropdown from './MultiselectDropdown.vue';
import type { Ref } from 'vue';
import Loading from './Loading.vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
const modalStore = useModalStore();
const { 
    registrationModalIsVisible, 
    reasonModalIsVisible,
    deleteBookModalIsVisible,
    voteResultsModalIsVisible  } = storeToRefs(useModalStore());

const props = withDefaults(defineProps<{
    name: "registration" | "reason" | "delete" | "voteResults" | "quote",
    backgroundColor?: string,
    color?: string,
    noFooter?: boolean,
    noCloseButton?: boolean,
    noCloseOnOutsideClick?: boolean
}>(), {
    noFooter: false,
    noCloseButton: false,
    noCloseOnOutsideClick: false
});

let modal: Ref<boolean>;

switch(props.name) {
    case "registration":
        modal = registrationModalIsVisible;
        break;
    case "reason":
        modal = reasonModalIsVisible;
        break;
    case "delete":
        modal = deleteBookModalIsVisible;
        break;
    case "voteResults":
        modal = voteResultsModalIsVisible;
        break;
}

function closeIfOutsideClick({target}: MouseEvent) {
  if(target == document.getElementById('modal') && !props.noCloseOnOutsideClick) {
    modalStore.close(modal);
  }
}

function close() {
  modalStore.close(modal);
}

</script>

<template>
  <Transition name="fade" mode="out-in">
    <div id="modal" @mousedown="closeIfOutsideClick($event)">
      <Transition name="slide-down" mode="out-in">
        <div class="modal-content">
          <Loading />
          
          <header class="container" 
          :style="{ backgroundColor: backgroundColor ?? 'var(--color-header)', color: color ?? ''}">
            <slot name="header"></slot>
            <span v-if="!noCloseButton" class="close" @click="close">&times;</span>
          </header>

          <div class="container">
            <slot></slot>
          </div>

          <footer v-if="!noFooter" class="container" :style="{ backgroundColor: backgroundColor ?? 'var(--color-header)'}">
            <slot name="footer"></slot>
          </footer>

        </div>
      </Transition>
    </div>
  </Transition>
  
</template>

<style scoped>
#modal {
  position: fixed;
  z-index: 4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* overflow: auto; */
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  vertical-align: middle;
}

.modal-content {
  background-color: #fefefe;
  border-radius: 20px;
  filter: drop-shadow(1.5px 3px 0.15em rgba(0, 0, 0, 0.5));
  position: relative;
  margin: 3% auto;
  border: 1px solid #888;
  width: 36%;
}

header {
  border-radius: 18.9px 18.9px 0 0;
  height: 2.5rem;
  position: relative;
  text-align: center;
  vertical-align: center;
}

.container {
  padding: 1em 4vw;
  width: 100%;
  display: flex;
  align-items: center;
}

.container:not(footer) {
    justify-content: center;
}

footer {
    justify-content: space-around;
    border-radius: 0 0 18.9px 18.9px;
    height: 3.5rem;
}

.close {
  color: #aaa;
  cursor: pointer;
  font-size: 28px;
  font-weight: bold;
  float: right;
  position: absolute;
  right: 16px;
  top: 0;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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

.slide-down-enter-from {
  opacity: 0;
}

.slide-down-enter-active {
  transition: all 0.5s ease-out;
  transform: translateY(50px);
}

.slide-down-enter-to {
  opacity: 1;
}

.slide-down-leave-to {
  opacity: 0;
}

.slide-down-leave-active {
  transition: all 0.5s ease-in;
  transform: 50;
}


</style>