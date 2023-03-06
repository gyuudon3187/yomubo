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
    username,
    password,
    signup,
    login
} = initializeVariables()

function initializeVariables() {
    const basePath = "landingPage.home.";

    return {
        welcomeMsg: t(basePath + "welcomeMsg"),
        username: initializeInputField(basePath + "username"),
        password: initializeInputField(basePath + "password"),
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
        <InputField :inputProps="username" />
        <InputField :inputProps="password" />
    </div>
    <div class="btn">
        <Button :buttonProps="signup" />
        <Button :buttonProps="login" />
    </div>
  </div>
    
    
</template>

<style scoped>
.welcomeMsg {
    color: #EDA14A;
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