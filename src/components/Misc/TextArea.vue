<script setup lang="ts">
import type { TextAreaInterface } from '@/types/misc';
const props = defineProps<{
    textAreaProps: TextAreaInterface
}>();

const basePath = "mainPage.modals.reason.maxChars."
const lettersPath = basePath + "letters";
const maxCharsExceededPath = basePath + "maxCharsExceeded"

function maxCharsExceeded() {
    return props.textAreaProps.input.value.length > <number>props.textAreaProps.maxChars
}
</script>

<template>
    <div>
        <textarea 
        :id="textAreaProps.id" 
        :name="textAreaProps.id" 
        :rows="textAreaProps.rows"
        :cols="textAreaProps.columns"
        v-model="textAreaProps.input.value" />
        <p v-if="textAreaProps?.maxChars"
        :class="{ maxCharsExceeded: maxCharsExceeded() }">
            {{ textAreaProps.input.value.length }}/{{ textAreaProps.maxChars }}
            {{ ' ' + $t(lettersPath) }}
            <span v-if="maxCharsExceeded()">{{ ' (' + $t(maxCharsExceededPath) + ')' }}</span>
        </p>
        
    </div>
</template>

<style scoped>
textarea {
    resize: none;
}

p, span {
    color: var(--color-alt-on-background);
}

.maxCharsExceeded, span {
    color: red;
}
</style>