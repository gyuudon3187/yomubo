<script setup lang="ts">
import { ref, type Ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ValidationGroup, Quote } from '@/types/misc';
import { 
    ValidationId,
    getValidationPath,
    initializeValidationGroup, 
    required,
    maxLength,
    touchAll } from '@/util/validation'
import QuoteField from './QuoteField.vue';
import { storeToRefs } from 'pinia';
import { useNoteTakerStore } from '@/stores/noteTaker';
const { t } = useI18n();
const { quotes } = storeToRefs(useNoteTakerStore());

interface QuoteField {
    input: Ref<string> | Ref<number>,
    placeholder: string,
    validation: ValidationGroup,
    rows?: Ref<number>
}

const basePath = "mainPage.clubContent.noteTaker.quotes.";
const placeholdersPath = basePath + "placeholders."

const quoteTextAreaInput = ref("");
const noteTextAreaInput = ref("");
const pageTextAreaInput = ref("");
const quoteInputs = [quoteTextAreaInput, noteTextAreaInput, pageTextAreaInput];
const { quoteValidation, noteValidation, pageValidation } = initializeValidations();
const allValidations = [quoteValidation, noteValidation, pageValidation];

const quoteTextAreaRows = ref(1);
const noteTextAreaRows = ref(1);

const quoteProps: QuoteField = {
    input: quoteTextAreaInput,
    placeholder: t(placeholdersPath + "quote"),
    validation: quoteValidation,
    rows: quoteTextAreaRows
}

const noteProps: QuoteField = {
    input: noteTextAreaInput,
    placeholder: t(placeholdersPath + "note"),
    validation: noteValidation,
    rows: noteTextAreaRows
}

const pageProps: QuoteField = {
    input: pageTextAreaInput,
    placeholder: t(placeholdersPath + "page"),
    validation: pageValidation
}

const addQuoteMode = ref(false);

onMounted(() => {
    window.addEventListener("keypress", addQuoteOnEnter)
    window.addEventListener("keydown", exitAddQuoteModeOnEscape)
})

onUnmounted(() => {
    window.removeEventListener("keypress", addQuoteOnEnter)
    window.removeEventListener("keydown", exitAddQuoteModeOnEscape)
})

watch(quotes, (value, oldValue) => {
    
})

watch([quoteTextAreaInput, noteTextAreaInput], ([quote, note]) => {
    const quoteLength = strLen(quote);
    const noteLength = strLen(note);

    if(quoteLength < 66) {
        if(quoteLength < 22) quoteTextAreaRows.value = 1;
        if(quoteLength >= 22 && quoteLength < 44) quoteTextAreaRows.value = 2;
        if(quoteLength >= 43 && quoteLength < 66) quoteTextAreaRows.value = 3;
    }

    if(noteLength < 66) {
        if(noteLength < 22) noteTextAreaRows.value = 1;
        if(noteLength >= 22 && noteLength < 44) noteTextAreaRows.value = 2;
        if(noteLength >= 43 && noteLength < 66) noteTextAreaRows.value = 3;
    }
})

function strLen(str: string) {
    let c;
    let length = 0;
    for (let i = 0; i < str.length; i++) {
        c = Number(str.charCodeAt(i));
        if (0x0000 <= c && c <= 0x0019) {
            length += 0;
        } else if (0x0020 <= c && c <= 0x1FFF) {
            length += 1;
        } else if (0x2000 <= c && c <= 0xFF60) {
            length += 2;
        } else if (0xFF61 <= c && c <= 0xFF9F) {
            length += 1;
        } else if (0xFFA0 <= c) {
            length += 2;
        }
    }
    return length;
}

function toggleAddQuoteMode() {
    quoteInputs.forEach(input => input.value = "");
    addQuoteMode.value = !addQuoteMode.value;
}

function addQuote(quote: Quote) {
    if(validateAll()) {
        quotes.value = [...quotes.value, quote].sort((a, b) => a.page - b.page);
        toggleAddQuoteMode();
    }
}

function removeQuote(quote: Quote) {
    quotes.value = quotes.value.filter(otherQuote => otherQuote !== quote);
}

function addQuoteOnEnter(e: KeyboardEvent) {
    if(e.key === "Enter" && addQuoteMode.value) {
        addQuote({ 
            content: quoteTextAreaInput.value, 
            note: noteTextAreaInput.value, 
            page: Number(pageTextAreaInput.value),
            isFullyVisible: false
        })
    }
}

function exitAddQuoteModeOnEscape(e: KeyboardEvent) {
    if(e.key === "Escape" && addQuoteMode.value) {
        toggleAddQuoteMode();
    }
}

function tooLong(str: string) {
    return strLen(str) > 21;
}

function trunctuate(str: string) {
    return tooLong(str) ? str.substring(0, strLen(str) === str.length ? 20 : 10) : str;
}

function toggleQuote(quote: Quote) {
    quotes.value = quotes.value.map(otherQuote => ({ 
        ...otherQuote, isFullyVisible: otherQuote === quote ? !quote.isFullyVisible : false
    }))
}

function validateAll() {
    touchAll(allValidations);
    return !allValidations.some(validation => validation.error.value);
}

function initializeValidations() {
    const validationBasePath = "validation.";
    const quotesValidationPath = getValidationPath(basePath);
    return {
        quoteValidation: initializeQuoteValidation(),
        noteValidation: initializeNoteValidation(),
        pageValidation: initializePageValidation(),
    }

    function initializeQuoteValidation() {
        return initializeValidationGroup([
            { validator: required, message: t(validationBasePath + ValidationId.Required)},
            { validator: maxLength, message: t(quotesValidationPath + ValidationId.MaxLength, { number: 255 }), params: 255}
        ])
    }

    function initializeNoteValidation() {
        return initializeValidationGroup([
            { validator: maxLength, message: t(quotesValidationPath + ValidationId.MaxLength, { number: 255}), params: 255}
        ])
    }

    function initializePageValidation() {
        return initializeValidationGroup([
            { validator: maxLength, message: t(quotesValidationPath + ValidationId.MaxLength, { number: 5}), params: 5 },
            { validator: isNonPositiveInteger, message: t(quotesValidationPath + ValidationId.Invalid) },
            { validator: isNotNumber, message: t(quotesValidationPath + ValidationId.NotNumber) }
            
        ])

        function isNonPositiveInteger(e: Event, params?: any) {
            const target = <HTMLInputElement>e.target;
            return Number(target.value) <= 0;
        }

        function isNotNumber(e: Event, params?: any) {
            const target = <HTMLInputElement>e.target;
            return !Number.isInteger(Number(target.value));
        }
    }
}
</script>

<template>
    <div class="quotes">
        <table>
            <thead>
                <tr>
                    <th style="width: 45%;">Quote</th>
                    <th style="width: 45%">Note</th>
                    <th style="width: 10%;">Page</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="quote in quotes" :class="{ selected: quote.isFullyVisible }">
                    <td @click="() => toggleQuote(quote)" 
                        style="width: 45%;" 
                        :class="{ tooLong: tooLong(quote.content) && !quote.isFullyVisible }">
                        {{ quote.isFullyVisible ? quote.content : trunctuate(quote.content) }}
                    </td>
                    <td @click="() => toggleQuote(quote)" 
                        style="width: 45%" 
                        :class="{ tooLong: tooLong(quote.content) && !quote.isFullyVisible }">
                        {{ quote.isFullyVisible ? quote.note : trunctuate(quote.note) }}
                    </td>
                    <td @click="() => toggleQuote(quote)" 
                        style="width: 10%;">
                        {{ quote.page }}
                    </td>
                    <Icon @click="() => removeQuote(quote)" icon="fa-solid fa-trash" />
                </tr>
            </tbody>
        </table>
        <Transition name="fade-fast" mode="out-in">
            <div v-if="!addQuoteMode" class="newQuote flexRow" @click="toggleAddQuoteMode">
                <Icon class="addIcon" icon="fa-solid fa-plus"/>
                <p>Add new quote...</p>
            </div>
            <div v-else>
                <div style="padding: 0 0.3vw; display: flex; flex-direction: row;">
                    <div style="width: 38.5%">
                        <QuoteField :quoteFieldProps="quoteProps" />
                    </div>
                    <div style="width: 38.5%">
                        <QuoteField :quoteFieldProps="noteProps" />
                    </div>
                    <div style="width: 15%; position: relative;">
                        <QuoteField :quoteFieldProps="pageProps" />
                    </div>
                    <div style="padding-left: 0.2vw">
                        <Icon @click="() => addQuote({ content: quoteTextAreaInput, note: noteTextAreaInput, page: Number(pageTextAreaInput), isFullyVisible: false })" class="save" icon="fa-solid fa-circle-check" />
                        <Icon @click="toggleAddQuoteMode" class="cancel" icon="fa-solid fa-circle-xmark" />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.expand-vertically-enter-active,
.expand-vertically-leave-active {
    transition: all 0.5s ease;
    max-height: 24vw;
    overflow: hidden;
}

.expand-vertically-enter-from,
.expand-vertically-leave-to {
    max-height: 0px;
}

.fade-fast-enter-active,
.fast-fast-leave-active {
    transition: all 0.05s;
    opacity: 1;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
    opacity: 0
}

.flexRow {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.quotes {
    padding: 0 0.5vw;
}

.newQuote {
    transition: color 0.2s;
    color: var(--color-alt-on-background);
    font-style: italic;
    user-select: none;
    cursor: pointer;
}

.newQuote:hover {
    transition: color 0.2s;
    color: var(--color-on-background);
}

.addIcon {
    border: solid 1px;
    padding: 0.2vw;
    border-radius: 0.5vw;
    transform: scale(0.7);
}

th {
    font-weight: bold;
}

th, td {
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

table {
    border-collapse: collapse;
    table-layout: fixed;
}

tbody tr {
    cursor: pointer;
    word-break: break-all;
}

tbody tr:hover {
    transition: all 0.3s;
    background-color: #ddd;
}

.selected {
    background-color: var(--color-header);
}

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

.tooLong {
    --mask: linear-gradient(to right, 
      rgba(0,0,0, 1) 0,   rgba(0,0,0, 1) 40%, 
      rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 100%
  );

  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.fa-circle-check {
    color: var(--color-positive);
    cursor: pointer;
}

.fa-circle-xmark {
    color: var(--color-negative);
    cursor: pointer;
}

.fa-trash {
    cursor: pointer;
}

.fa-trash:hover {
    color: var(--color-negative);
}

textarea {
    resize: none;
}
</style>