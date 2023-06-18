<script setup lang="ts">
import type { BookCandidate } from '@/types/misc';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useReadingListStore } from '@/stores/readingList';
const { readingList } = storeToRefs(useReadingListStore());

const title = "Title";
const authors = "Author";
const synopsis = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ";
const image = "src/assets/kagami_no_kojou.png";
const selectedBook: Ref<BookCandidate> = ref({ id: "", title, authors, synopsis, image, pages: 415, reason: "", addedBy: "", selected: false });

watch(readingList, () => {
    selectedBook.value = readingList.value.find(book => book.selected) ?? { id: "", title, authors, synopsis, image, pages: 415, reason: "", addedBy: "", selected: false };
})
</script>

<template>
    <div class="container">
        
        <div class="subcontainer">
            
            <div class="synopsisContainer">
                <p style="color: black; font-size: 1.4vw; font-weight: 700;">{{ selectedBook.title }}</p>
                <p style="color: var(--color-alt-on-background); font-size: 1.1vw;">{{ selectedBook.authors }}</p>
                <p class="synopsis">{{ selectedBook.synopsis }}</p>
            </div>
        </div>
        <img class="book" :src="selectedBook.image"/>
    </div>
</template>

<style scoped>
.container {
    /* width: 35vw; */
    height: 16.4vw;
}

.book {
    border-radius: 3px;
    position:absolute;
    bottom: 2vw;
    left: 2vw;
    width: 10vw;
    height: auto;
}

.subcontainer {
    width: 100%;
    height: 13.3vw;
    background-color: white;
    border-radius: 20px;
    bottom: 0;
    position: absolute;
}

.synopsisContainer {
    padding-left: 13vw;
    padding-top: 0.5rem;
    width: 34vw;
    /* background-color: red; */
}

.synopsis {
    overflow-y: auto; 
    height: 7vw;
    font-size:1vw;
    color: var(--color-on-background);
}

</style>