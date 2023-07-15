<script setup lang="ts">
import ValidationMessage from '@/components/Misc/ValidationMessage.vue';
import type { ValidationGroup } from '@/types/misc';
import type { Ref } from 'vue';
import { 
    validate, 
    touch, 
    untouch } from '@/util/validation'

interface QuoteField {
    input: Ref<string> | Ref<number>,
    placeholder: string,
    validation: ValidationGroup,
    rows?: Ref<number>
}

const props = defineProps<{
    quoteFieldProps: QuoteField
}>();

function dirtyAndError(): boolean | undefined {
  return props.quoteFieldProps.validation?.dirty.value && props.quoteFieldProps.validation.error.value
}

function preventNewline(e: KeyboardEvent) {
    if(e.key === "Enter") e.preventDefault();
}
</script>

<template>
    <textarea 
        @blur="touch(quoteFieldProps.validation); validate($event, quoteFieldProps.validation)"
        @focus="untouch(quoteFieldProps.validation)"
        @keypress="preventNewline"
        :rows="quoteFieldProps.rows?.value ?? 1" 
        v-model="quoteFieldProps.input.value" 
        :placeholder="quoteFieldProps.placeholder" 
        class="quoteInput" />
    <ValidationMessage 
        v-if="!!quoteFieldProps.validation" 
        v-show="dirtyAndError()" 
        :invalid="quoteFieldProps.validation.error" 
        :message="quoteFieldProps.validation?.displayMessage.value" />
</template>

<style scoped>
@import '@/util/validation.css';

.quoteInput {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color .2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    color: var(--color-on-background);
    box-sizing: border-box;
}

.quoteInput:hover, .quoteInput:focus {
    border-color: #aaaeb7;
}

textarea {
    resize: none;
}
</style>