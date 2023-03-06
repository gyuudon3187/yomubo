<script setup lang="ts">
import type {
  InputComponent,
  InputFieldInterface,
  RadioButtonInterface,
  MultiselectDropdownInterface,
  ButtonInterface, 
InputComponentGroup} from '@/types/misc';
import Button from '@/components/Misc/Button.vue';
import Input from '@/components/Misc/InputField.vue';
import { useModalStore } from '@/stores/modal';
const modal = useModalStore();

defineProps<{
  header: string,
  componentGroups?: InputComponentGroup[]
  buttons: ButtonInterface[]
}>();

function closeModal(e: Event) {
  if(e.target == document.getElementById('modal')) {
    modal.close();
  }
}

function isInputField(component: InputComponent): component is InputFieldInterface {
  return component.__typename === "InputFieldInterface";
}

function isRadioButton(component: InputComponent): component is RadioButtonInterface {
  return component.__typename === "RadioButtonInterface";
}

function isMultiselectDropdown(component: InputComponent): component is MultiselectDropdownInterface {
  return component.__typename === "MultiselectDropdownInterface";
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div id="modal" @mousedown="closeModal($event)">
      <Transition name="slide-down" mode="out-in">
        <div class="modal-content">
          
          <header class="container">
            <h2>{{ header }}</h2>
            <span class="close" @click="modal.close()">&times;</span>
          </header>

          <div class="container">
            <div v-if="componentGroups">
              <div v-for="componentGroup in componentGroups">
                <h3>{{ componentGroup.label }}</h3>
                <div v-for="component in componentGroup.components" class="components">

                  <div v-if="isInputField(component)">
                    <Input :inputProps="component" />
                  </div>

                  <div v-else-if="isRadioButton(component)">
                    <input type="radio" id="male" name="gender" :value="component.buttons[0]">
                    <label for="gender">{{ component.buttons[0] }}</label>
                  </div>

                  <div v-else-if="isMultiselectDropdown(component)">
                    multiselect
                  </div>

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
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  vertical-align: middle;
}

.modal-content {
  background-color: #fefefe;
  border-radius: 20px;
  filter: drop-shadow(1.5px 3px 0.15em rgba(0, 0, 0, 0.5));
  margin: 10% auto;
  border: 1px solid #888;
  width: 50%;
}

.components > input {
  width: 100%;
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