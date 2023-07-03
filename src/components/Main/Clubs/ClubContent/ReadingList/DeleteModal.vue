<script setup lang="ts">
import Modal from '@/components/Misc/NewModal.vue';
import TextArea from '@/components/Misc/TextArea.vue';
import Button from '@/components/Misc/Button.vue';
import type { BookCandidate, TextAreaInterface } from '@/types/misc';
import { initializeButton } from '@/components/util'
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useClubStore } from '@/stores/club';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const modalStore = useModalStore();
const { deleteBookModalIsVisible } = storeToRefs(modalStore);
const clubStore = useClubStore();
const { bookToBeEdited } = storeToRefs(clubStore);

const basePath = "mainPage.modals.delete."
const MODAL_HEADER = t(basePath + "header");
const WARNING = t(basePath + "main", { bookName: bookToBeEdited.value?.title ?? ""});

const { backButtonProps, confirmButtonProps,  } = initializeProps();

function initializeProps() {
    const { backButtonProps, confirmButtonProps } = initializeButtonProps();

    return {
        backButtonProps,
        confirmButtonProps
    }

    function initializeButtonProps() {
        const buttonsPath = basePath + "buttons.";

        return {
            backButtonProps: initializeButton(buttonsPath + "back", "quaternary", () => modalStore.close(deleteBookModalIsVisible)),
            confirmButtonProps: initializeButton(buttonsPath + "confirm", "primary", () => confirmDeletion())
        }

        function confirmDeletion() {
            clubStore.removeFromReadingList(<BookCandidate>bookToBeEdited.value);
            deleteBookModalIsVisible.value = false;
        }
    }
}
</script>

<template>
    <Modal name="reason" background-color="var(--color-negative)" color="var(--color-on-negative)">
        <template #header>
            <h3>{{ MODAL_HEADER }}</h3>
        </template>
        <template #default>
            <p v-html="WARNING"/>
        </template>
        <template #footer>
            <Button :button-props="backButtonProps" />
            <Button :button-props="confirmButtonProps" />
        </template>
    </Modal>
</template>

<style scoped>
p {
    color: var(--color-on-background);
    text-align: center;
}
</style>