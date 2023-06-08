<script setup lang="ts">
import InputField from '../../../components/Misc/InputField.vue';
import Button from '../../../components/Misc/Button.vue';
import { initializeButton, initializeInputField } from "@/components/util";
import { getPlaceholderValidation } from '@/util/validation'
import { useI18n } from 'vue-i18n';
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
const { t } = useI18n();
const modal = useModalStore();
const { logIn } = useAuthStore();

const {
    welcomeMsg,
    email,
    password,
    signup,
    login,
    logInOnEnter
} = initializeVariables();

function initializeVariables() {
    const basePath = "landingPage.home.";
    const isPassword = true;

    enum InputId {
        Email = "loginEmail",
        Password = "loginPassword"
    }

    const emailInput = ref("");
    const passwordInput = ref("");
    const emailInputField = initializeInputField(InputId.Email, basePath, emailInput, getPlaceholderValidation())
    const passwordInputField = initializeInputField(InputId.Password, basePath, passwordInput, getPlaceholderValidation(), isPassword);
    const authComponents = [emailInputField, passwordInputField];

    function logInOnEnter(e: KeyboardEvent) {
        if(e.key === "Enter") {
            e.preventDefault();
            logIn({email: emailInput.value, password: passwordInput.value}, authComponents)
        }
    }

    return {
        welcomeMsg: t(basePath + "welcomeMsg"),
        email: emailInputField,
        password: passwordInputField,
        signup: initializeButton(basePath + "signup", "primary", modal.open),
        login: initializeButton(basePath + "login", "secondary", () => logIn({email: emailInput.value, password: passwordInput.value}, authComponents)),
        logInOnEnter
    }
}

</script>

<template>
  <div class="container">
    <div class="welcomeMsg" v-html="welcomeMsg">
    </div>
    <div class="input">
        <InputField @keypress="logInOnEnter" :inputProps="email" />
        <InputField @keypress="logInOnEnter" :inputProps="password" />
    </div>
    <div class="btn">
        <Button :buttonProps="login" />
        <Button :buttonProps="signup" />
    </div>
  </div>
    
    
</template>

<style scoped>
.welcomeMsg {
    color: #EDA14A;
    margin-bottom: 30px;
    line-height: 1.2;
    letter-spacing: 0.6px;
    word-spacing: 2px;
}

.input > * {
    display: inline-block;
    margin-right: 10px;
}

.btn > * {
    margin-top: 15px;
    margin-right: 2rem;
}
</style>