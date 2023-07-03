<script setup lang="ts">
import type { BookCandidate } from '@/types/misc';
import { changeSelectionOnScroll } from '@/components/util';
import { watch, onMounted, onUnmounted, ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useBooksStore } from '@/stores/books';
import { useClubStore } from '@/stores/club';
import { useI18n } from 'vue-i18n';
import BookSearchResults from '@/components/Main/Clubs/ClubContent/ReadingList/BookSearchResults.vue'
const { uid } = useAuthStore();
const clubStore = useClubStore();
const { 
    selectedClub, 
    currentMeeting, 
    currentMeetingIndex,
    selectedBookIndex,
    bookToBeEdited } = storeToRefs(clubStore);
const booksStore = useBooksStore();
const { searchInput } = storeToRefs(booksStore);
const modalStore = useModalStore();
const { reasonModalIsVisible, deleteBookModalIsVisible } = storeToRefs(modalStore);
const { t } = useI18n();

const basePath = "mainPage.clubContent.readingList.";
const optionsPath = basePath + "options.";

const OPTIONS = {
    VOTE: t(optionsPath + "vote"),
    UNVOTE: t(optionsPath + "unvote")
}

const { openReasonModal, openDeleteModalOrDeleteBook } = initializeModalFunctions();

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
    const currentClub = selectedClub.value;
    selectedClub.value = Object.assign(currentClub, {
        readingList: currentClub.readingList.map((otherBook, index) => {
            if(hasSameId(otherBook)) selectedBookIndex.value = index;
            return Object.assign(otherBook, { selected: hasSameId(otherBook) })
        })
    })

    function hasSameId(otherBook: BookCandidate) {
        return book.id === otherBook.id
    }
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

function voteOrUnvote(bookId: string) {
    if(currentMeeting.value.votes[uid]) {
        currentMeeting.value.votes[uid] === bookId ? unvote() : voteAndUnvote();
    } else {
        vote(bookId);
    }
    
    function voteAndUnvote() {
        unvote();
        vote(bookId);
    }

    function vote(bookId: string) {
        const currentClub = selectedClub.value;

        selectedClub.value = Object.assign(currentClub, {
            meetings: currentClub.meetings.map((meeting, index) => 
                index === currentMeetingIndex.value ? 
                Object.assign(meeting, Object.assign(meeting.votes, { [uid]: bookId })) : meeting),
            readingList: currentClub.readingList.map(book => 
                book.id === bookId ? Object.assign(book, { voted: true }) : book)
        })
    }

    function unvote() {
        const currentClub = selectedClub.value;

        const prevBookId = selectedClub.value.meetings[currentMeetingIndex.value].votes[uid]
        delete selectedClub.value.meetings[currentMeetingIndex.value].votes[uid];
        selectedClub.value = Object.assign(currentClub, {
            readingList: currentClub.readingList.map(book => 
                book.id === prevBookId ? Object.assign(book, { voted: false }) : book)
        })
    }
}

function initializeModalFunctions() {
    return {
        openReasonModal,
        openDeleteModalOrDeleteBook
    }

    function openReasonModal(book: BookCandidate) {
        setBookToBeEdited(book);
        modalStore.open(reasonModalIsVisible);
    }

    function openDeleteModal(book: BookCandidate) {
        setBookToBeEdited(book);
        modalStore.open(deleteBookModalIsVisible);
    }

    function openDeleteModalOrDeleteBook(book: BookCandidate) {
        book.reason === '' ? clubStore.removeFromReadingList(book) : openDeleteModal(book);
    }

    function setBookToBeEdited(book: BookCandidate) {
        bookToBeEdited.value = book;
    }
}

function changeBookSelectionOnScroll(e: WheelEvent) {
    const readingList = ref(selectedClub.value.readingList);
    changeSelectionOnScroll(e, selectedBookIndex, readingList);
    selectedClub.value = Object.assign(selectedClub.value, { readingList: readingList.value })
}

function trunctuate(str: string) {
    return str.length > 12 ? str.substring(0, 12) : str;
}
</script>

<template>
    <div style="position: relative;">
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
            <div @wheel="changeBookSelectionOnScroll" class="readingList">
                <div class="book flexRow" :class="{selected: book.selected}" v-for="book in selectedClub.readingList">
                    <div class="bookDetails" @click="() => selectBook(book)">
                        <p :class="{tooLong: book.title.length > 12}" style="width: 7.1vw;">{{ trunctuate(book.title) }}</p>
                        <p :class="{tooLong: book.title.length > 12}" style="width: 8.2vw">{{ trunctuate(book.authors) }}</p>
                        <p style="">{{ book.pages }}</p>
                    </div>
                    <div class="bookOptions">
                        <Icon v-if="book.addedBy === uid" @click="() => openDeleteModalOrDeleteBook(book)" class="icon negative" icon="fa-solid fa-circle-xmark"/>
                        <Icon v-if="book.addedBy === uid" @click="() => openReasonModal(book)" class="icon primary" icon="fa-solid fa-pen"/>
                        <Icon v-if="book.addedBy !== uid" @click="() => openReasonModal(book)" class="icon primary" icon="fa-solid fa-eye"/>
                        <button :class="{ voted: book.voted, notVoted: !book.voted }" @click="() => voteOrUnvote(book.id)">
                            {{ book.voted ? OPTIONS.UNVOTE : OPTIONS.VOTE }}
                        </button>
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
    cursor: pointer;
}

.notVoted {
    background-color: var(--color-positive);
    color: var(--color-on-positive);
    width: 3.5vw;
    transition: all 0.2s;
}

.voted {
    background-color: var(--color-negative);
    color: var(--color-on-negative);
    width: 4.5vw;
    transition: all 0.2s;
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