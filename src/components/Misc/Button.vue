<script setup lang="ts">
import type { ButtonInterface } from "@/types/misc";

const props = defineProps<{
    buttonProps: ButtonInterface
}>();

</script>

<template>
    <button v-if="buttonProps.active?.value === false" :id="buttonProps.id" class="tertiary" @click="buttonProps.callback" disabled>
        {{ buttonProps.text }}
    </button>
    <button v-else :id="buttonProps.id" :class="buttonProps.type" @click="buttonProps.callback">
        {{ buttonProps.text }}
    </button>
</template>

<style scoped>
button {
    border: none;
    border-radius: 1rem;
    color: var(--color-on-primary);
    text-align: center;
    display: inline-block;
    font-size: 16px;
    transition: 120ms;
    height: 2.5rem;
    width: 7rem;
    cursor: pointer;
}

.primary {
    background-color: var(--color-primary);
}

.secondary {
    background-color: var(--color-scnd-primary);
}

.tertiary {
    background-color: var(--color-tertiary);
    color: rgb(248, 248, 248);
    cursor: default;
}

.quaternary {
    background-color: var(--color-quaternary);
    border: 2px solid var(--color-quaternary-border);
    color: var(--color-on-background);
}

.primary:hover, .secondary:hover {
    transition: 120ms;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.08);
}

.quaternary:hover {
    transition: 120ms;
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.08);
}


</style>