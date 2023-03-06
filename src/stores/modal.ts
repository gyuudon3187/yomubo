import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
    const isVisible: Ref<boolean> = ref(false);

    function open() {
        if(!isVisible.value) isVisible.value = true;
    }

    function close() {
        if(isVisible.value) isVisible.value = false;
    }

    return { isVisible, open, close }
})