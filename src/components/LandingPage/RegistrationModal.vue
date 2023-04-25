<script setup lang="ts">
import Modal from "../../components/Misc/Modal.vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth"
import { useModalStore } from "@/stores/modal";
import untypedLanguages from '@/i18n/languages.json';
import {
  initializeButtons,
  initializeInputField,
  initializeRadioButton,
  initializeMultiselectDropdown,
  initializeInputComponentGroup } from "@/components/util";
import { 
  confirmPassword,
  getValidationPath,
  initializeValidationGroup,
  required,
  minLength,
  maxLength,
  emailFormat, 
  validateAll,
  touchAll,
  ValidationId, 
  nameFormat,
  firstLetterCapitalized } from "@/util/validation";
import type { ButtonInterface, InputComponentGroup, ValidationGroup } from "@/types/misc";
import { ref, type Ref } from "vue";
const { t } = useI18n();
const { createUser } = useAuthStore();
const { close } = useModalStore();

const {
  header,
  componentGroups,
  buttons,
  requiredFields
} = initializeVariables()

function initializeVariables(): { header: string,
                                  componentGroups: InputComponentGroup[],
                                  buttons: ButtonInterface[],
                                  requiredFields: string[],
                                  allValidations: ValidationGroup[]} {
  const firstNameInput = ref("");
  const lastNameInput = ref("");
  const genderInput = ref("");
  const languagesInput: Ref<string[]> = ref([]);
  const emailInput = ref("");
  const passwordInput = ref("");

  enum InputId {
    FirstName = "firstName",
    LastName = "lastName",
    Gender = "gender",
    Languages = "languages",
    Email = "registrationEmail",
    Password = "registrationPassword",
    ConfirmPassword = "confirmPassword"
  }

  const basePath = "landingPage.registration.";
  const buttonsPath = basePath + "buttons.";

  const { componentGroups, allValidations } = initializeInputComponentGroupsAndValidations();

  return {
    header: t(basePath + "header"),
    componentGroups,
    buttons: initializeButtons(buttonsPath, [
      {text: "return", type: "quaternary", callback: close},
      {text: "submit", type: "primary", callback: submit}
    ]),
    requiredFields: [InputId.FirstName, InputId.Email, InputId.Password, InputId.ConfirmPassword],
    allValidations
  }

  function submit(): void {
    if(validateAll(allValidations, componentGroups, requiredFields)) {
      createUser({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        gender: genderInput.value,
        languages: languagesInput.value
      }, componentGroups);
    } else {
      touchAll(allValidations);
    };
  }

  function initializeInputComponentGroupsAndValidations(): { componentGroups: InputComponentGroup[],
                                                             allValidations: ValidationGroup[] } {
    const inputPath = basePath + "input.";
    const namePath = inputPath + "name.";
    const genderPath = inputPath + "gender.";
    const languagesPath = inputPath + "languages.";
    const emailPath = inputPath + "email.";
    const passwordPath = inputPath + "password.";
    const passwordValidationPath = getValidationPath(passwordPath);

    const {
      firstNameValidation,
      emailValidation,
      passwordValidation } = initializeValidations();

    const { 
      nameGroup,
      genderGroup,
      languagesGroup,
      emailGroup } = initializeComponentGroups();
    
    const { passwordGroup, confirmPasswordValidation } = initializePasswordGroupAndConfirmValidation();

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
      ]
    }

    function initializeComponentGroups(): { nameGroup: InputComponentGroup,
                                            genderGroup: InputComponentGroup,
                                            languagesGroup: InputComponentGroup,
                                            emailGroup: InputComponentGroup } {
      return {
        nameGroup: initializeNameGroup(),
        genderGroup: initializeGenderGroup(),
        languagesGroup: initializeLanguagesGroup(),
        emailGroup: initializeEmailGroup(),
      }

      function initializeNameGroup(): InputComponentGroup {
        const nameLabelPath = getLabelPath(namePath);
        const nameGroup = initializeInputComponentGroup(nameLabelPath, [
          initializeInputField(InputId.FirstName, namePath, firstNameInput, firstNameValidation),
          initializeInputField(InputId.LastName, namePath, lastNameInput)
        ]);

        return nameGroup;
      }

      function initializeGenderGroup(): InputComponentGroup {
        enum Gender {
          Male = "male",
          Female = "female",
          Other = "other"
        }

        const genders = Object.values(Gender);
        const checkedIndex = genders.indexOf(Gender.Other);
        const genderLabelPath = getLabelPath(genderPath);
        const genderGroup = initializeInputComponentGroup(genderLabelPath, [
          initializeRadioButton(InputId.Gender, genderPath, genders, genderInput, undefined, checkedIndex)
        ]);

        return genderGroup;
      }

      function initializeLanguagesGroup(): InputComponentGroup {
        interface Language {
          [language: string]: {
            name: string,
            nativeName: string
          }
        }

        const typedLanguages: Language = untypedLanguages;
        const languages: string[] = Object.keys(typedLanguages).map(language => {
          return typedLanguages[language as keyof Language].name
        });
        
        const noTranslation = true;
        const languagesLabelPath = getLabelPath(languagesPath)
        const languagesGroup = initializeInputComponentGroup(languagesLabelPath, [
          initializeMultiselectDropdown(InputId.Languages, languagesPath, languages, languagesInput, undefined, noTranslation)
        ]);

        return languagesGroup;
      }

      function initializeEmailGroup(): InputComponentGroup {
        const emailLabelPath = getLabelPath(emailPath);
        const emailGroup = initializeInputComponentGroup(emailLabelPath, [
          initializeInputField(InputId.Email, emailPath, emailInput, emailValidation)
        ]);

        return emailGroup;
      }
    }

    function initializeValidations(): { firstNameValidation: ValidationGroup,
                                        emailValidation: ValidationGroup,
                                        passwordValidation: ValidationGroup } {
      const validationBasePath = "validation.";

      return {
        firstNameValidation: initializeFirstNameValidation(),
        emailValidation: initializeEmailValidation(),
        passwordValidation: initializePasswordValidation()
      }
      
      function initializeFirstNameValidation(): ValidationGroup {
        const nameValidationPath = getValidationPath(namePath);
        const firstNameValidation = initializeValidationGroup([
          { validator: required, message: t(validationBasePath + ValidationId.Required) },
          { validator: maxLength, message: t(nameValidationPath + ValidationId.MaxLength), params: 20 },
          { validator: firstLetterCapitalized, message: t(nameValidationPath + ValidationId.FirstLetterCapitalized) },
          { validator: nameFormat, message: t(nameValidationPath + ValidationId.Alphabetical) }
        ]);

        return firstNameValidation
      }

      function initializeEmailValidation(): ValidationGroup {
        const emailValidationPath = getValidationPath(emailPath);
        const emailValidation = initializeValidationGroup([
          { validator: required, message: t(validationBasePath + ValidationId.Required)},
          { validator: emailFormat, message: t(emailValidationPath + ValidationId.Invalid) }
        ]);

        return emailValidation;
      }

      function initializePasswordValidation(): ValidationGroup {
        
        const passwordValidation = initializeValidationGroup([
          { validator: required, message: t(validationBasePath + ValidationId.Required) },
          { validator: minLength, message: t(passwordValidationPath + ValidationId.MinLength), params: 6 }
        ]);

        return passwordValidation;
      }
    }

    function initializePasswordGroupAndConfirmValidation(): { passwordGroup: InputComponentGroup,
                                                              confirmPasswordValidation: ValidationGroup } {
      const isPassword = true;

      const passwordField = initializeInputField(InputId.Password, passwordPath, passwordInput, passwordValidation, isPassword)
      const confirmPasswordValidation = initializeValidationGroup([
          { validator: confirmPassword, message: t(passwordValidationPath + ValidationId.NotMatching), params: passwordField.input }
        ]);

      const passwordLabelPath = getLabelPath(passwordPath);
      const passwordGroup = initializeInputComponentGroup(passwordLabelPath, [
        passwordField,
        initializeInputField(InputId.ConfirmPassword, passwordPath, undefined, confirmPasswordValidation, isPassword)
      ]);

      return { passwordGroup, confirmPasswordValidation }
    }
  }

  function getLabelPath(path: string): string {
    return path + "label";
  }
}
</script>

<template>
  <Modal :header="header" :componentGroups="componentGroups" :buttons="buttons"></Modal>
</template>