<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    slideUpText: string
}>();

const input = ref("");
</script>

<template>
    <div class="test">
        <input class="input" v-model="input"/>
        <label class="label">{{ props.slideUpText }}</label>
    </div>
</template>

<style scoped>
.test {
    position: relative;
}

.input {
    background: var(--color-input);
    border: 2px solid var(--color-header);
    border-radius: 5px;
    height: 2rem;
    outline: none;
    padding-left: 1rem;
    transition: all .3s;
}

.input:focus  {
    border: 2px solid #7C4200;
}

.input:focus+.label,
.filled {
    top: -10px;
    color:#7C4200;
    font-size: 14px;
}

.input::placeholder {
    font-size: 16px;
    opacity: 0;
    transition: all .3s;
}

.input:focus::placeholder {
    opacity: 1;
    animation-delay: 0.2s;
}

.label {
    position: absolute;
    color: var(--color-text-inactive);
    left: 10px;
    top: 5px;
    transition: all 0.2s;
    padding: 0.2px;
    pointer-events: none;
    z-index: 1;
}

.label::before {
    content: "";
    height: 5px;
    background-color: var(--color-input);
    position: absolute;
    left: 0;
    top: 10px;
    width: 100%;
    z-index: -1;
}
</style>