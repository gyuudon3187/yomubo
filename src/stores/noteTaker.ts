import type { Quote } from "@/types/misc";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useNoteTakerStore = defineStore('noteTakerStore', () => {
    const quotes: Ref<Quote[]> = ref([]);

    return { quotes }
})