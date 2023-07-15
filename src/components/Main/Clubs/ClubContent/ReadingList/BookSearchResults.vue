<script setup lang="ts">
import type { Book, BookCandidate } from "@/types/misc";
import { storeToRefs } from 'pinia';
import { useAuthStore } from "@/stores/auth"; 
import { useBooksStore } from '@/stores/books';
import { useClubStore } from "@/stores/club";
import { useInfiniteScroll } from '@vueuse/core'
import { ref } from 'vue';
const booksStore = useBooksStore();
const { clubs, selectedClubIndex, selectedClub } = storeToRefs(useClubStore());
const { uid } = useAuthStore();

function addToReadingList(book: Book): void {
    const processedBook: BookCandidate = Object.assign(book, {
        selected: false,
        voted: false,
        addedBy: uid,
        reason: ""
    })

    clubs.value = clubs.value.map((club, index) => index !== selectedClubIndex.value ? club : {
        ...club,
        readingList: club.readingList.every(otherBook => otherBook.id !== book.id) ?
                     [ ...club.readingList, processedBook] : club.readingList
    })
}

const infScroll = ref<HTMLElement | null>(null);
let semaphore = true;

function getMoreBooks() {
    if(semaphore) {
        semaphore = false;
        booksStore.currentIndex += 10;
        booksStore.getBooks();
        setTimeout(() => semaphore = true, 1000)
    }
}

useInfiniteScroll(infScroll, getMoreBooks, { distance: 10 })
</script>

<template>
    <div ref="infScroll" class="container">
        <div class="bookSearch">
            <div @click="() => addToReadingList(book)" v-for="book in booksStore.books" class="searchResult">
                <img class="book" :src="book.image"/>
                <div style="padding-left: 0.3vw;">
                    <p style="font-size: 10px; color: var(--color-on-background)">{{ book.title }}</p>
                    <p style="font-size: 8px; color: var(--color-alt-on-background)">{{ book.authors }}</p>
                </div>
            </div>
            <img class="loading" src="@/assets/spin.gif">
        </div>
    </div>
</template>

<style scoped>
.book {
    height: 3vw;
    width: auto;
}

.container {
    width: 12.6vw;
    max-height: 13vw;
    filter: drop-shadow(1.5px 3px 0.15em rgba(0, 0, 0, 0.3));
    background-color: white;
    padding: 1.6vw 0 0.5vw;
}

.bookSearch {
    overflow-y: auto;
    text-align: center;
}

.searchResult {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.2vw 1vw;
    user-select: none;
}

.searchResult img {
    border-radius: 0.2vw;
}

.searchResult:hover {
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
    cursor: pointer;
}

.loading {
    width: 2vw
}
</style>