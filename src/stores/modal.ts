import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
    const registrationModalIsVisible = ref(false);
    const reasonModalIsVisible = ref(false);
    const deleteBookModalIsVisible = ref(false);
    const voteResultsModalIsVisible = ref(false);

    function open(modal: Ref<boolean>) {
        if(!modal.value) modal.value = true;
    }

    function close(modal: Ref<boolean>) {
        if(modal.value) modal.value = false;
    }

    return {
        registrationModalIsVisible,
        reasonModalIsVisible,
        deleteBookModalIsVisible,
        voteResultsModalIsVisible,
        open,
        close
    }
})