<script setup lang="ts">
import type { ButtonInterface } from "@/types/misc";

defineProps<{
    buttonProps: ButtonInterface
}>();
</script>

<template>
    <button :class="buttonProps.type" @click="buttonProps.callback">
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
    border: 2px solid var(--color-tertiary-border);
    color: var(--color-on-background)
}

.primary:hover, .secondary:hover {
    transition: 120ms;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.08);
}

.tertiary:hover {
    transition: 120ms;
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.08);
}


</style>