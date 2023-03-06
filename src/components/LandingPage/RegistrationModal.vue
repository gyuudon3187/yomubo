<script setup lang="ts">
import type { 
  InputComponent,
  ButtonInterface,
  InputComponentGroup } from "@/types/misc";
import Modal from "../../components/Misc/Modal.vue";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/modal";
import {
  initializeButton,
  initializeInputField,
  initializeRadioButton,
  initializeMultiselectDropdown,
  initializeInputComponentGroup } from "@/components/util";
const { t } = useI18n();
const { close } = useModalStore();

const {
  header,
  componentGroups,
  buttons
} = initializeVariables()

function initializeVariables() {
  const basePath = "landingPage.registration.";
  const header = t(basePath + "header");

  function initializeInputComponentGroups(): InputComponentGroup[] {
    const inputPath = basePath + "input.";
    const namePath = inputPath + "name.";
    const genderPath = inputPath + "gender.";
    const languagesPath = inputPath + "languages.";
    const emailPath = inputPath + "email.";
    const passwordPath = inputPath + "password.";

    const nameGroup = initializeInputComponentGroup(namePath + "label", [
      initializeInputField(namePath + "firstName"),
      initializeInputField(namePath + "lastName")
    ])

    const genderGroup = initializeInputComponentGroup(genderPath + "label", [
      initializeRadioButton(genderPath, ["male", "female", "other"])
    ])

    const languagesGroup = initializeInputComponentGroup(languagesPath + "label", [
      initializeMultiselectDropdown(languagesPath, ["english", "swedish"])
    ])

    const emailGroup = initializeInputComponentGroup(emailPath + "label", [
      initializeInputField(emailPath + "email")
    ])

    const passwordGroup = initializeInputComponentGroup(passwordPath + "label", [
      initializeInputField(passwordPath + "password"),
      initializeInputField(passwordPath + "confirmPassword")
    ])


    return [
      nameGroup,
      genderGroup,
      languagesGroup,
      emailGroup,
      passwordGroup
    ]
  }

  function initializeButtons(): ButtonInterface[] {
    const buttonsPath = basePath + "buttons.";

    return [
      initializeButton(buttonsPath + "return", "tertiary", close),
      initializeButton(buttonsPath + "submit", "primary", () => {})
    ]
  }

  return {
    header,
    componentGroups: initializeInputComponentGroups(),
    buttons: initializeButtons()
  }
}
</script>

<template>
  <Modal :header="header" :componentGroups="componentGroups" :buttons="buttons"></Modal>
</template>