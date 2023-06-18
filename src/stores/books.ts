import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import debounce from 'lodash.debounce';
import type { Book } from "@/types/misc";

export const useBooksStore = defineStore("booksStore", () => {
    const books: Ref<Book[]> = ref([]);
    const searchInput = ref("");
    const currentIndex = ref(0);

    function setBooks(googleBooks: any[]): void {
        const processedBooks = googleBooks.sort((book1, book2) => {
            const length1 = book1.volumeInfo.description?.length ?? 0;
            const length2 = book2.volumeInfo.description?.length ?? 0;
            
            return length2 - length1;
        }).map(book => {
            const volumeInfo = book.volumeInfo;
            const images = volumeInfo.imageLinks;

            const id = book.id;
            const image = images?.['thumbnail'] ? images['thumbnail'] : 
                        images?.['smallThumbnail'] ? images['smallThumbnail'] : 
                        'src/assets/placeholder.png';
            const title = volumeInfo.title;
            const synopsis = volumeInfo?.description ? volumeInfo.description : "Synopsis unavailable";
            const authors = !volumeInfo?.authors ? "Author unknown" : 
                        volumeInfo.authors.length === 1 ? volumeInfo.authors[0] : 
                        volumeInfo.authors.reduce((acc: string, cur: string, i: number) => 
                            i === 0 ? cur + ", " : acc + ", " + cur);
            const pages = volumeInfo.pageCount;

            return { id, image, title, synopsis, authors, pages };
        })

        books.value = [...books.value].concat(processedBooks);
    }

    function getBooks() {
        if(searchInput.value) {
            fetch("https://www.googleapis.com/books/v1/volumes?" + new URLSearchParams({
                q: searchInput.value,
                startIndex: currentIndex.value.toString()
            }))
            .then(res => res.json())
            .then(result => setBooks(result.items));
        }
    }

    const getBooksOnSearch = debounce(getBooks, 1500);
    const cancelSearch = getBooksOnSearch.cancel;

    return { getBooksOnSearch, cancelSearch, getBooks, currentIndex, books, searchInput }
})