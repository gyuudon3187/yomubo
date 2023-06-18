<script setup lang="ts">
import type { Ref } from 'vue';
import type { BookCandidate } from '@/types/misc';
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useBooksStore } from '@/stores/books';
import { useReadingListStore } from '@/stores/readingList';
import BookSearchResults from '@/components/Main/Clubs/ClubContent/ReadingList/BookSearchResults.vue'
const { uid } = useAuthStore();
const { readingList } = storeToRefs(useReadingListStore());
const booksStore = useBooksStore();
const { searchInput } = storeToRefs(booksStore);

onMounted(() => window.addEventListener("click", closeBookSearchOnOutsideClick))
onUnmounted(() => window.removeEventListener("click", closeBookSearchOnOutsideClick))

function closeBookSearchOnOutsideClick({ target }: MouseEvent) {
    const inputEl = document.querySelector(".bookSearchInput");
    const searchResultsEl = document.querySelector(".bookSearch")

    if(target !== inputEl && !searchResultsEl?.contains(target as Node)) {
        searchInput.value = "";
    }
}

function selectBook(book: BookCandidate) {
    readingList.value = readingList.value.map(otherBook => Object.assign(otherBook, {
        selected: book.id === otherBook.id ? true : false
    }))
}

function removeFromReadingList(book: BookCandidate): void {
    readingList.value = readingList.value.filter(otherBook => otherBook.id !== book.id);
}

function getBooks() {
    booksStore.books = [];
    booksStore.currentIndex = 0;

    if(booksStore.searchInput.length !== 0) {
        booksStore.getBooksOnSearch();
    } else {
        booksStore.cancelSearch();
    }
}

function trunctuateTitle(title: string) {
    return title.length > 12 ? title.substring(0, 12) : title;
}
</script>

<template>
    <div>
        <Transition name="expand">
            <BookSearchResults v-if="booksStore.searchInput" class="bookSearch"/>
        </Transition>
        <p style="font-size: 1.8vw; color: var(--color-on-background)">Reading List</p>
        <div class="readingListContent">
            <div class="header flexRow">
                <div class="subheaders flexRow">
                    <p>Title</p>
                    <p>Author</p>
                    <p>Pages</p>
                </div>
                <input placeholder="Search for book title" class="bookSearchInput" v-model="booksStore.searchInput" @input="() => getBooks()" />
            </div>
            <div class="readingList">
                <div class="book flexRow" :class="{selected: book.selected}" v-for="book in readingList">
                    <div class="bookDetails" @mouseup="() => selectBook(book)">
                        <p :class="{tooLong: book.title.length > 12}" style="width: 7.1vw;">{{ trunctuateTitle(book.title) }}</p>
                        <p style="width: 8.2vw">{{ book.authors }}</p>
                        <p style="">{{ book.pages }}</p>
                    </div>
                    <div class="bookOptions">
                        <Icon v-if="book.addedBy === uid" @click="() => removeFromReadingList(book)" class="icon negative" icon="fa-solid fa-circle-xmark"/>
                        <Icon v-if="book.addedBy === uid" class="icon primary" icon="fa-solid fa-pen"/>
                        <Icon v-if="book.addedBy !== uid" class="icon primary" icon="fa-solid fa-eye"/>
                        <button>Vote</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.1s ease;
    max-height: 13vw;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0px;
}

p {
    color: var(--color-on-background);
    font-size: 1vw;
    cursor: pointer;
}

.flexRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header {
    background-color: var(--color-on-primary);
    height: 1.8vw;
    padding: 0 1vw 0 1vw;
    border-radius: 1.8vw 1.8vw 0 0;
}

.header p {
    font-weight: bold;
}

.subheaders {
    width: 55%;
}

.readingList {
    height: 11.5vw;
    padding: 0.5vw 0vw 0 0vw;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
    overflow-y: auto;
}

.book {
    border-radius: 1vw;
    padding-left: 1vw;
    user-select: none;
}

.icon {
    display: none;
    padding-right: 0.3vw;
}

.book:hover .icon {
    display: block;
}

.negative {
    color: var(--color-quaternary-border);
}

.negative:hover {
    color: var(--color-negative);
}

.primary {
    color: var(--color-quaternary-border);
}

.primary:hover {
    color: var(--color-primary);
}

.book:hover:not(:has(.bookOptions:hover)) {
    background-color: var(--color-background);
}

.book:active:not(:has(.bookOptions:hover)) {
    background-color: var(--color-active-container);
}

.bookDetails {
    display: flex;
    flex-direction: row;
}

.selected {
    border: solid var(--color-on-primary-container) 0.15vw;
    background-color: var(--color-background);
}

.tooLong {
    --mask: linear-gradient(to right, 
      rgba(0,0,0, 1) 0,   rgba(0,0,0, 1) 40%, 
      rgba(0,0,0, 0) 95%, rgba(0,0,0, 0) 100%
  );

  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.bookOptions {
    display: flex;
    flex-direction: row;
    padding-right: 1vw;
    cursor: pointer;
}

.bookOptions button {
    border: none;
    border-radius: 1vw;
    background-color: var(--color-positive);
    color: var(--color-on-positive);
    cursor: pointer;
}

.bookSearchInput {
    border-radius: 2vw;
    border: none;
    padding-left: 0.8vw;
    height: 1.4vw;
    width: 12.6vw;
    z-index: 2;
}

.bookSearchInput:focus {
    outline-width: 0;
}

.bookSearch {
    border-radius: 0.7vw;
    position: absolute;
    right: 1vw;
    top: 3.1vw;
    z-index: 1;
}
</style>