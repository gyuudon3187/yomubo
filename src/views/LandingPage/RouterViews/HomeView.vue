<script setup lang="ts">
import InputField from '../../../components/Misc/InputField.vue';
import Button from '../../../components/Misc/Button.vue';
import { initializeButton, initializeInputField } from "@/components/util";
import { useI18n } from 'vue-i18n';
import { useModalStore } from '@/stores/modal';
const { t } = useI18n();
const modal = useModalStore();

const {
    welcomeMsg,
    email,
    password,
    signup,
    login
} = initializeVariables()

function initializeVariables() {
    const basePath = "landingPage.home.";
    const isPassword = true;

    return {
        welcomeMsg: t(basePath + "welcomeMsg"),
        email: initializeInputField("email", basePath),
        password: initializeInputField("password", basePath, undefined, isPassword),
        signup: initializeButton(basePath + "signup", "primary", modal.open),
        login: initializeButton(basePath + "login", "secondary", () => {}),
    }
}
</script>

<template>
  <div class="container">
    <div class="welcomeMsg" v-html="welcomeMsg">
    </div>
    <div class="input">
        <InputField :inputProps="email" />
        <InputField :inputProps="password" />
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