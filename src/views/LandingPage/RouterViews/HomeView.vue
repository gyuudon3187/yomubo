<script setup lang="ts">
import Input from '../../../components/Misc/Input.vue';
import Button from '../../../components/Misc/Button.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const welcomeMsg = t("landingPage.home.welcomeMsg");
const username = t("landingPage.home.username");
const password = t("landingPage.home.password");
const signup = t("landingPage.home.signup");
const login = t("landingPage.home.login");
</script>

<template>
  <div class="container">
    <div class="welcomeMsg" v-html="welcomeMsg">
    </div>
    <div class="input">
        <Input :slideUpText="username" />
        <Input :slideUpText="password" />
    </div>
    <div class="btn">
        <Button :text="signup" type="primary" />
        <Button :text="login" type="secondary" />
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