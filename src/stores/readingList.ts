import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { BookCandidate } from "@/types/misc";



export const useReadingListStore = defineStore('readingListStore', () => {
    const readingList: Ref<BookCandidate[]> = ref([
        {
            id: "a",
            title: "Kyokousendan",
            pages: 592,
            image: "src/assets/placeholder.png",
            synopsis: "test 1",
            authors: "test author 1",
            reason: "",
            selected: false,
            addedBy: "uTLPdMdT61UvUxAkxVw4p1jcYRg2"
        },
        {
            id: "b",
            title: "Kagami no Kojou",
            pages: 415,
            image: "src/assets/kagami_no_kojou.png",
            synopsis: "test 2",
            authors: "test author 2",
            reason: "",
            selected: false,
            addedBy: "TestUser2"
        }
    ])

    function setReason(book: BookCandidate, reason: string): void {
        readingList.value = readingList.value.map(otherBook => 
            book.id === otherBook.id ? Object.assign(book, { reason }) : book)
    }

    return { readingList, setReason }
})