<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

onMounted(() => {
  window.addEventListener("scroll", showExplanationOnScroll);
})

onUnmounted(() => {
  window.removeEventListener("scroll", showExplanationOnScroll);
})

const { 
  mainHeader,
  explanations,
  offset,
  observedPositions,
  explanationColumns } = initializeVariables();

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
  mainHeader: number,
  explanation: number,
  spaceBetweenExplanationRows: number
};

function initializeVariables() {
  const basePath = "landingPage.explanation.";
  const explanationNames = ["findClub", "readingList", "synopsisAndProgress", "voteResults"];
  const explanationColumns = 2;
  const offset = initializeOffset();

  function initializeMainHeader(): MainHeader {
    return {
      text: t(basePath + "header"),
      isVisible: ref(false)
    }
  }

  function initializeExplanations(explanationNames: string[]): Explanation[] {
    const assetsPath = "src/assets/";
    return explanationNames.map(name => ({
      header: t(basePath + name + ".header"),
      description: t(basePath + name + ".description"),
      imgSrc: assetsPath + name + ".png",
      isVisible: ref(false)
    }))
  }

  function initializeOffset(): Offset {
    return {
      viewport: 600,
      mainHeader: 120,
      explanation: 350,
      spaceBetweenExplanationRows: 380
    }
  }

  function initializeObservedPositions(): number[] {
    const observedPositions: number[] = [];
    const explanationRows = Math.ceil(explanationNames.length / explanationColumns);

    for(let i = 0; i < explanationRows; i++) {
      for(let j = 0; j < explanationColumns; j++) {
        observedPositions.push((i * offset.spaceBetweenExplanationRows) + offset.explanation)
      }
    }

    return observedPositions;
  }

  return {
    mainHeader: initializeMainHeader(),
    explanations: initializeExplanations(explanationNames),
    observedPositions: initializeObservedPositions(),
    offset,
    explanationColumns
  }
}

function showExplanationOnScroll(): void {
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

function leftOrRight(name: string, columnIndex: number): string {
  return name + (columnIndex % explanationColumns === 0 ? '-left' : '-right');
}
</script>

<template>
  <div class="explanation">

    <Transition name="slide-left" mode="out-in">
      <h1 id="how-it-works" class="explanation-header-right" v-show="mainHeader.isVisible.value">{{ mainHeader.text }}</h1>
    </Transition>
  
    <div id="explanation-items">

      <Transition 
        v-for="(explanation, index) in explanations" 
        :key="index"
        :name="leftOrRight('slide', index)">

        <div class="explanation-item" v-show="explanation.isVisible.value">
          <h1 :class="leftOrRight('explanation-header', index)">{{ explanation.header }}</h1>

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