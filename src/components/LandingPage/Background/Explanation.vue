<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const basePath = "landingPage.explanation.";
const assets = "src/assets/";

interface explanation {
  header: string,
  description: string,
  imgSrc?: string
};

const explanations: explanation[] = [
  {header: basePath + "findClub.header", 
  description: t(basePath + "findClub.description"), 
  imgSrc: assets + "findClub.png"},

  {header: basePath + "readingList.header",
  description: t(basePath + "readingList.description"),
  imgSrc: assets + "readingList.png"},

  {header: basePath + "synopsisAndProgress.header",
  description: t(basePath + "synopsisAndProgress.description"),
  imgSrc: assets + "book.png"},

  {header: basePath + "voteResults.header",
  description: t(basePath + "voteResults.description"),
  imgSrc: assets + "voteResults.png"},
]
</script>

<template>
  <div class="explanation">
    <h1 class="how-it-works-header">{{ t("landingPage.explanation.header") }}</h1>
  
    <div class="explanation-items">

      <div v-for="(explanation, index) in explanations" :key="index" class="explanation-item">
        <h1 :class="index % 2 == 0 ? 'explanation-header-left' : 'explanation-header-right'">
          {{ t(explanation.header) }}
        </h1>
        <p v-html="explanation.description" />
        <div class="explanation-image">
          <img
          style="height: 100%"
          :src="explanation.imgSrc"
        />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.explanation {
  position: absolute;
  top: 800px;
  width: 100%;
}

.explanation-items {
  display: grid;
  grid-template-columns: repeat(2, 500px);
  grid-auto-rows: 350px;
  grid-row-gap: 30px;
  justify-content: space-around;
  text-align: center;
}

.explanation-header-right {
  background: linear-gradient(270deg, #FC4F59 22.01%,  #FC984F 99.32%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.explanation-header-left {
  background: linear-gradient(90deg, #FC4F59 22.01%,  #FC984F 99.32%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.explanation-image {
  height: 200px;
}

.how-it-works-header {
  position: absolute;
  top: -200px;
  right: 0px;
  font-weight: 400;
  font-size: 96px;
  background: linear-gradient(270deg, #FC4F59 22.01%,  #FC984F 99.32%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.how-it-works-header::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 30px;
  width: 26%;
  left: 69%;
  border-radius: 5px;
  border-bottom: 5px solid #FC4F59;
}

.explanation-item p {
  padding-bottom: 1rem;
}
</style>