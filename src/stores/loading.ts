import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loadingStore", () => {
    const isVisible = ref(false);

    function toggleLoading(): void {
      isVisible.value = !isVisible.value;
    }

    return { isVisible, toggleLoading }
})