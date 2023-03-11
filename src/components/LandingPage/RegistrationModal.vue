<script setup lang="ts">
import type { InputComponentGroup, Validation, ValidationGroup } from "@/types/misc";
import Modal from "../../components/Misc/Modal.vue";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/modal";
import untypedLanguages from '@/i18n/languages.json';
import {
  initializeButtons,
  initializeInputField,
  initializeRadioButton,
  initializeMultiselectDropdown,
  initializeInputComponentGroup,
  isInputField } from "@/components/util";
import { 
  confirmPassword,
  getValidationPath,
  initializeValidationGroup,
  required,
  minLength,
  maxLength,
  emailFormat } from "@/util/validation";
import { ref, watchEffect } from "vue";
import { isDate } from "@vue/shared";
const { t } = useI18n();
const { close } = useModalStore();

enum Ids {
  FirstName = "firstName",
  LastName = "lastName",
  Gender = "gender",
  Languages = "languages",
  Email = "email",
  Password = "password",
  ConfirmPassword = "confirmPassword"
}

const {
  header,
  componentGroups,
  buttons,
  allValidations
} = initializeVariables()

function initializeVariables() {
  const basePath = "landingPage.registration.";
  const buttonsPath = basePath + "buttons.";
  const { componentGroups, allValidations } = initializeInputComponentGroupsAndValidations();

  function initializeInputComponentGroupsAndValidations() {
    const inputPath = basePath + "input.";
    const namePath = inputPath + "name.";
    const genderPath = inputPath + "gender.";
    const languagesPath = inputPath + "languages.";
    const emailPath = inputPath + "email.";
    const passwordPath = inputPath + "password.";

    const isPassword = true;
    const checkedIndex = 2;
    const customOptionsEnabled = true;
    
    const {
      firstNameValidation,
      emailValidation,
      passwordValidation } = initializeValidations();

    const nameGroup = initializeInputComponentGroup(namePath + "label", [
      initializeInputField(Ids.FirstName, namePath, firstNameValidation),
      initializeInputField(Ids.LastName, namePath)
    ])

    const genderGroup = initializeInputComponentGroup(genderPath + "label", [
      initializeRadioButton(Ids.Gender, genderPath, ["male", "female", "other"], undefined, checkedIndex)
    ])


    interface Language {
      [language: string]: {
        name: string,
        nativeName: string
      }
    }

    const typedLanguages: Language = untypedLanguages;
    const languages: string[] = Object.keys(typedLanguages).map(language => {
      return typedLanguages[language as keyof Language].name
    })
    
    const languagesGroup = initializeInputComponentGroup(languagesPath + "label", [
      initializeMultiselectDropdown(Ids.Languages, languagesPath, languages, customOptionsEnabled)
    ])

    const emailGroup = initializeInputComponentGroup(emailPath + "label", [
      initializeInputField(Ids.Email, emailPath, emailValidation)
    ])

    const passwordField = initializeInputField(Ids.Password, passwordPath, passwordValidation, isPassword)
    const passwordValidationPath = getValidationPath(passwordPath);
    const confirmPasswordValidation = initializeValidationGroup([
        { validator: confirmPassword, message: t(passwordValidationPath + "notMatching"), params: passwordField.input }
      ])
    const passwordGroup = initializeInputComponentGroup(passwordPath + "label", [
      passwordField,
      initializeInputField(Ids.ConfirmPassword, passwordPath, confirmPasswordValidation, isPassword)
    ])

    function initializeValidations() {
      
      const nameValidationPath = getValidationPath(namePath);
      const firstNameValidation = initializeValidationGroup([
        { validator: required, message: t(nameValidationPath + "required") },
        { validator: maxLength, message: t(nameValidationPath + "length"), params: 20}
      ])

      const emailValidationPath = getValidationPath(emailPath);
      const emailValidation = initializeValidationGroup([
        { validator: emailFormat, message: t(emailValidationPath + "invalid") }
      ])

      const passwordValidationPath = getValidationPath(passwordPath);
      const passwordValidation = initializeValidationGroup([
        { validator: minLength, message: t(passwordValidationPath + "minLength"), params: 5 }
      ])

      return {
        firstNameValidation,
        emailValidation,
        passwordValidation
      }
    }

    return {
    componentGroups: [
      nameGroup,
      genderGroup,
      languagesGroup,
      emailGroup,
      passwordGroup
    ], 
    allValidations: [
      firstNameValidation,
      emailValidation,
      passwordValidation,
      confirmPasswordValidation
    ]}
  }

  function submit(): void {
    if(allValidations.every(validation => validation.error.value === false) &&
    componentGroups.flatMap(group => {
      return group.components.filter(comp => {
        return [Ids.FirstName, Ids.Email, Ids.Password, Ids.ConfirmPassword].some(id => id === comp.id)
      })
    }).map(comp => {
      if(isInputField(comp)) {
        return comp.input.value
      }
    }).every(input => input !== "")) console.log("hi")
  }

  return {
    header: t(basePath + "header"),
    componentGroups,
    buttons: initializeButtons(buttonsPath, [
      {text: "return", type: "quaternary", callback: close},
      {text: "submit", type: "primary", callback: () => {}}
    ]),
    allValidations
  }
}

watchEffect(() => {
  // console.log(
  //   allValidations.every(validation => validation.error.value === false) &&
  //   componentGroups.flatMap(group => {
  //     return group.components.filter(comp => {
  //       return [Ids.FirstName, Ids.Email, Ids.Password, Ids.ConfirmPassword].some(id => id === comp.id)
  //     })
  //   }).map(comp => {
  //     if(isInputField(comp)) {
  //       return comp.input.value
  //     }
  //   }).every(input => input !== ""))
})
</script>

<template>
  <Modal :header="header" :componentGroups="componentGroups" :buttons="buttons"></Modal>
</template>