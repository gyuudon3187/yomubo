<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    readPages: number,
    totalPages: number
}>()
defineEmits(['update:readPages'])

const value = ref(props.readPages);
const max = computed(() => props.totalPages);
const percentage = computed(() => (value.value / max.value) * 100);
const offset = computed(() => (percentage.value - 50) * 0.08);
const sliderFill = computed(() => `linear-gradient(to right, var(--color-primary-container) ${percentage.value}%, #d5d5d5 ${percentage.value}%`);

let lines: ("short" | "long")[] = [];

for(let i = 0; i < 11; i++) {
    if(i === 0 || i === 5 || i === 10) {
        lines.push("long")
    } else {
        lines.push("short")
    }
}

let activeArrow = ref(true);
let isVisible = ref(false);

const hideArrowsOnMouseDown = () => isVisible.value = false;

const toggleArrowColors = (() => {
    let timeoutTimer: NodeJS.Timeout;
    let intervalTimer: NodeJS.Timeout;

    return () => {
        if(intervalTimer) clearTimeout(intervalTimer);
        if(timeoutTimer) clearTimeout(timeoutTimer);

        intervalTimer = setInterval(() => activeArrow.value = !activeArrow.value, 800)
        timeoutTimer = setTimeout(() => {
            clearTimeout(intervalTimer);
            (<HTMLElement>document.activeElement).blur();
            isVisible.value = false;
        }, 4000)
    }
})();

const toggleArrowColorsOnMouseUp = () => {
    isVisible.value = true;
    toggleArrowColors();
}

const toggleArrowColorsOnKeypress = () => {
    const slider = document.querySelector(".rangeSlider");
    let timer: NodeJS.Timeout;

    return (e: KeyboardEvent) => {
        if(document.activeElement === slider && (
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowDown")) {
            if(timer) clearTimeout(timer)
            isVisible.value = false;
            toggleArrowColors();
            timer = setTimeout(() => isVisible.value = true, 600)
        }
    }
}

onMounted(() => {
    window.addEventListener("keydown", toggleArrowColorsOnKeypress())
})

onUnmounted(() => {
    const slider = document.querySelector(".rangeSlider");
    window.removeEventListener("keydown", toggleArrowColorsOnKeypress());
})

</script>

<template>
    <div style="position: relative;">
        <input :style="{ background: sliderFill }" 
                class="rangeSlider"
                @input="$emit('update:readPages', (<HTMLInputElement>$event.target).value)"
                @mousedown="hideArrowsOnMouseDown"
                @mouseup="toggleArrowColorsOnMouseUp" 
                type="range" 
                min="0" 
                :max="max" 
                v-model="value">
        <output class="bubble" :style="{ left: (percentage) + '%'}">{{ value }}</output>
        <Transition name="fade" mode="out-in">
            <div v-show="isVisible" class="keyboardArrows" :style="{ left: (percentage - offset) + '%'}">
                <Icon icon="fa-solid fa-caret-square-left" :class="{ activeArrow: activeArrow }" />
                <Icon icon="fa-solid fa-caret-square-up" style="margin-bottom: 12px" />
                <Icon icon="fa-solid fa-caret-square-right" :class="{ activeArrow: !activeArrow }" />
                <Icon icon="fa-solid fa-caret-square-down" style="margin-left: -26px" />
            </div>
        </Transition>
        
        <div class="lines">
            <div v-for="(line, index) in lines"
                :style="{ marginLeft: '2px', paddingRight: index !== 10 ? '1.85vw' : '0' }" 
                :class="{ longLine: line === 'long', shortLine: line === 'short'}">
                <div style="padding-top: 10px; font-size: 9px; color: #d5d5d5;">
                    <p v-if="index === 0">0</p>
                    <p v-if="index === 10" :style="{ right: max < 100 ? '10px' : max < 1000 ? '15px' : '20px' }">{{ max }}</p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
input[type=range] {
  height: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #d5d5d5;
  width: 100%;
  outline: none;
  border-radius: 8px;
  /* bottom: -10px; */
}

input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 8px;
}

input[type=range]::-moz-track {
    -moz-appearance: none;
    height: 8px;
}

input[type=range]::-ms-track {
    appearance: none;
    height: 8px;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    background-color: var(--color-primary-container);
    border-radius: 50%;
    cursor: grab;
    margin-top: -6px;
}

input[type=range]::-moz-range-thumb {
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    background-color: var(--color-primary-container);
    border-radius: 50%;
    cursor: grab;
    margin-top: -6px;
}

input[type=range]::-ms-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    background-color: var(--color-primary-container);
    border-radius: 50%;
    cursor: grab;
    margin-top: -6px;
}

input[type=range]:active::-webkit-slider-thumb {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    cursor: grabbing;
}

input[type=range]:active::-webkit-slider-thumb::before {
    height: 10px;
    width: 10px;
    background-color: red;
}

input[type=range]:active::-moz-range-thumb {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    cursor: grabbing;
}

input[type=range]:active::-ms-thumb {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    cursor: grabbing;
}

input[type=range]:not(:active)+.bubble {
    display: none;
}

input[type=range]:active+.bubble {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 4px;
    background: #7E715D;
    color: white;
    position: absolute;
    border-radius: 5px;
    transform: translateX(-50%);
    top: 30px;
    font-size: 9px;
    z-index: 1;
}

.lines {
    display: flex;
    flex-direction: row;
}

.longLine {
    width: 0;
    height: 8px;
    border-left: 1px solid #d5d5d5;
}

.shortLine {
    width: 0;
    height: 4px;
    border-left: 1px solid #d5d5d5;
}

.keyboardArrows {
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}


.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-out;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    transition: all 0.2s ease-in;
    opacity: 0;
}

.activeArrow {
    color: var(--color-primary);
}
</style>