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
import RadioButton from '@/components/Misc/RadioButton.vue'
import MultiselectDropdown from './MultiselectDropdown.vue';
import { useModalStore } from '@/stores/modal';
const modal = useModalStore();

defineProps<{
  header: string,
  componentGroups?: InputComponentGroup[]
  buttons: ButtonInterface[]
}>();

function close({target}: MouseEvent) {
  if(target == document.getElementById('modal')) {
    modal.close();
  }
}

</script>

<template>
  <Transition name="fade" mode="out-in">
    <div id="modal" @mousedown="close($event)">
      <Transition name="slide-down" mode="out-in">
        <div class="modal-content">
          
          <header class="container">
            <h2>{{ header }}</h2>
            <span class="close" @click="modal.close()">&times;</span>
          </header>

          <div class="container">
            <div v-if="componentGroups">
              <div v-for="componentGroup in componentGroups" class="component-group">
                <h3>{{ componentGroup.label }}</h3>
                <div v-for="component in componentGroup.components" class="components">

                  <Input v-if="isInputField(component)" :inputProps="component" />
                  <RadioButton v-else-if="isRadioButton(component)" :radioButtonProps="component" />
                  <MultiselectDropdown v-else-if="isMultiselectDropdown(component)" :multiselectProps="component" class="select"/>

                </div>
              </div>
            </div>
          </div>

          <footer class="container">
            <Button v-for="button in buttons" :buttonProps="button" />
          </footer>

        </div>
      </Transition>
    </div>
  </Transition>
  
</template>

<style scoped>
#modal {
  position: fixed;
  z-index: 2;
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
  margin: 3% auto;
  border: 1px solid #888;
  width: 36%;
}

.component-group {
  margin-bottom: 0.5rem;
}

.components {
  display: inline-block;
}

.components > div {
  margin: 10px;
}

header {
  background-color: var(--color-header);
  border-radius: 20px 20px 0 0;
  height: 2.5rem;
  position: relative;
  text-align: center;
  vertical-align: center;
}

.container {
  padding: 0.01em 16px;
  width: 100%;
}

footer {
  align-items: center;
  background-color: var(--color-header);
  border-radius: 0 0 20px 20px;
  display: flex;
  height: 3.5rem;
  justify-content: space-around;
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