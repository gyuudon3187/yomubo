<script setup lang="ts">
defineProps<{
    text: string,
    type: string
}>();
</script>

<template>
    <button :class="type">{{ text }}</button>
</template>

<style scoped>
button {
    border: none;
    border-radius: 0.25rem;
    color: var(--color-on-primary);
    text-align: center;
    display: inline-block;
    font-size: 16px;
    transition: 120ms;
    height: 2.5rem;
    width: 7rem;
    cursor: pointer;
}

button:hover {
    transition: 120ms;
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.08);
}

.primary {
    background-color: var(--color-primary);
}

.secondary {
    background-color: var(--color-scnd-primary);
}
</style>