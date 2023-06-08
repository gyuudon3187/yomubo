<script setup lang="ts">

</script>

<template>
    <div>
        <h style="font-size: 1.8vw; color: var(--color-on-background)">Reading List</h>
        <div class="readingListContent">
            <div class="header">
                <p>Title</p>
                <p>Author</p>
                <p>Pages</p>
                <input placeholder="Search for book title" size="18" class="bookSearch" />
            </div>
            <div class="readingList">

            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    color: var(--color-on-background);
    font-size: 1vw;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-on-primary);
    height: 1.8vw;
    padding: 0 1vw 0 1vw;
    border-radius: 1.8vw 1.8vw 0 0;
}

.header p {
    font-weight: bold;
}

.readingList {
    height: 11.5vw;
    padding: 0.5vw 2.5vw 0 1vw;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
}

.bookSearch {
    border-radius: 2vw;
    border: none;
    padding-left: 10px;
}
</style>