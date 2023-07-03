<script setup lang="ts">
import Modal from '@/components/Misc/NewModal.vue';
import TextArea from '@/components/Misc/TextArea.vue';
import Button from '@/components/Misc/Button.vue';
import type { TextAreaInterface } from '@/types/misc';
import { initializeButton } from '@/components/util'
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useClubStore } from '@/stores/club';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const modalStore = useModalStore();
const { reasonModalIsVisible } = storeToRefs(modalStore);
const { selectedClub, bookToBeEdited } = storeToRefs(useClubStore());

const basePath = "mainPage.modals.reason."
const MODAL_HEADER = t(basePath + "header");

const textAreaInput = ref("");
const lessThanMaxChars = computed(() => textAreaInput.value.length <= 255);

const { backButtonProps, submitButtonProps, textAreaProps } = initializeProps();

watch(
    () => {
        if(bookToBeEdited.value) return bookToBeEdited.value.reason
    },
    () => {
        if(bookToBeEdited.value) textAreaInput.value = bookToBeEdited.value.reason
    }
)

function initializeProps() {
    const { backButtonProps, submitButtonProps } = initializeButtonProps();

    return {
        backButtonProps,
        submitButtonProps,
        textAreaProps: initializeTextAreaProps()
    }

    function initializeButtonProps() {
        const buttonsPath = basePath + "buttons.";

        return {
            backButtonProps: initializeButton(buttonsPath + "back", "quaternary", goBack),
            submitButtonProps: initializeButton(buttonsPath + "submit", "primary", submit, lessThanMaxChars)
        }

        function goBack() {
            delayTextAreaResetSoThatTransitionLooksNatural();
            modalStore.close(reasonModalIsVisible);

            function delayTextAreaResetSoThatTransitionLooksNatural() {
                setTimeout(() => textAreaInput.value = "", 300);
            }
        }

        function submit() {
            const currentClub = selectedClub.value;

            selectedClub.value = Object.assign(currentClub, { 
                readingList: currentClub.readingList.map(book => {
                return book.id === bookToBeEdited.value?.id ? Object.assign(book, {
                    reason: textAreaInput.value
                }) : book})
            })

            textAreaInput.value = "";
            reasonModalIsVisible.value = false;
        }
    }

    function initializeTextAreaProps(): TextAreaInterface {
        const id = "reasonTextArea";

        return {
            __typename: "TextAreaInterface",
            input: textAreaInput,
            id,
            rows: 5,
            columns: 50,
            maxChars: 255
        }
    }
}
</script>

<template>
    <Modal name="reason">
        <template #header>
            <h3>{{ MODAL_HEADER }}</h3>
        </template>
        <template #default>
            <TextArea :text-area-props="textAreaProps" />
        </template>
        <template #footer>
            <Button :button-props="backButtonProps" />
            <Button :button-props="submitButtonProps" />
        </template>
    </Modal>
</template>

<style scoped>

</style>