<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

interface MainHeader {
  text: string,
  isVisible: Ref<boolean>
};

interface Explanation {
  header: string,
  description: string,
  imgSrc: string,
  isVisible: Ref<boolean>
};

interface Offset {
  viewport: number,
  mainHeader: number
};

function initializeVariables() {
  const basePath = "landingPage.explanation.";

  function initializeMainHeader(): MainHeader {
    return {
      text: basePath + "header",
      isVisible: ref(false)
    }
  }

  function initializeExplanations(explanationNames: string[]): Explanation[] {
    const assetsPath = "src/assets/";
    const initializedExplanations: Explanation[] = [];

    explanationNames.forEach(name => {
      initializedExplanations.push({
        header: basePath + name + ".header",
        description: t(basePath + name + ".description"),
        imgSrc: assetsPath + name + ".png",
        isVisible: ref(false)
      })
    })

    return initializedExplanations;
  }

  function initializeOffset(): Offset {
    return {
      viewport: 600,
      mainHeader: 120
    }
  }

  return {
    mainHeader: initializeMainHeader(),
    explanations: initializeExplanations(["findClub", "readingList", "synopsisAndProgress", "voteResults"]),
    offset: initializeOffset()
  }
}

function leftOrRight(name: string, index: number): string {
  return name + (index % 2 === 0 ? '-left' : '-right');
}

const {mainHeader, explanations, offset} = initializeVariables();
let observedPositions: number[] = [];

onMounted(() => {
  function eventListener(): void {
    let ticking = false;
    let i = 0;

    if(!ticking) {
      window.requestAnimationFrame(() => {
        const observedViewport = window.scrollY + window.innerHeight - offset.viewport;
        mainHeader.isVisible.value = observedViewport > offset.mainHeader;
        observedPositions.forEach(observedPos => {
          explanations[i++].isVisible.value = observedViewport > observedPos;
        })
      })
    }

    ticking = true;
  }

  const explanationLevelCount = Math.ceil(document.querySelector("#explanation-items")!.children.length) / 2;
  for(let i = 0; i < explanationLevelCount; i++) {
    observedPositions.push((i * 400) + 350)
    observedPositions.push((i * 400) + 350)
  }
  window.addEventListener("scroll", eventListener)
})
</script>

<template>
  <div class="explanation">

    <Transition name="slide-left" mode="out-in">
      <h1 id="how-it-works" class="explanation-header-right" v-show="mainHeader.isVisible.value">{{ t(mainHeader.text) }}</h1>
    </Transition>
  
    <div id="explanation-items">

      <Transition 
        v-for="(explanation, index) in explanations" 
        :key="index"
        :name="leftOrRight('slide', index)">

        <div class="explanation-item" v-show="explanation.isVisible.value">
          <h1 :class="leftOrRight('explanation-header', index)">{{ t(explanation.header) }}</h1>

          <p v-html="explanation.description" />

          <div class="explanation-image">
            <img style="height: 100%" :src="explanation.imgSrc"/>
          </div>
        </div>

      </Transition>
      

    </div>
  </div>
</template>

<style scoped>
.explanation {
  position: absolute;
  top: 800px;
  width: 100%;
}

#explanation-items {
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

#how-it-works {
  position: absolute;
  top: -200px;
  right: 0px;
  font-weight: 400;
  font-size: 96px;
}

#how-it-works::after {
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

.slide-left-enter-from {
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.5s ease-out;
  transform: translateX(-50px);
}

.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.slide-left-leave-to {
  opacity: 0;
}

.slide-left-leave-active {
  transition: all 0.5s ease-in;
  transform: translateX(-50px);
}

.slide-right-enter-from {
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.5s ease-out;
  transform: translateX(50px);
}

.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.slide-right-leave-to {
  opacity: 0;
}

.slide-right-leave-active {
  transition: all 0.5s ease-in;
  transform: translateX(50px);
}
</style>