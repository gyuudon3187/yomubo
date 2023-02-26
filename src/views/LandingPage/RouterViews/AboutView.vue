<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const introduction = t("landingPage.about.introduction");
</script>

<template>
  <div class="container">
    <h1 class="header">{{ t("landingPage.about.header", {account: 'placeholdder', domain: 'placeholder.com'}) }}</h1>
    <p v-html="introduction" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .container {
    width: 500px;
    word-wrap: break-word;
  }

  .header {
    color: #EDA14A;
  }
}
</style>
