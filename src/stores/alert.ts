import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alertStore", () => {
    const alertIsVisible = ref(false);
    const alertIsPositive = ref(false);
    const message = ref("")

    function displayAlert(msg: string, isPositive: boolean) {
        message.value = msg;
        alertIsPositive.value = isPositive;
        alertIsVisible.value = true;
    }

    return { alertIsVisible, alertIsPositive, message, displayAlert }
})