<script setup lang="ts">

</script>

<template>
    <div>
        <div class="myClubsTitle">
            <h style="color: var(--color-on-background)">My Clubs</h>
            <div class="line"></div>
        </div>
        <div class="myClubs"></div>
    </div>
</template>

<style scoped>
.myClubsTitle {
    font-size: x-large;
    bottom: -8px;
}

.myClubs {
    width: 180px;
    height: 300px;
    /* background-color: aqua; */
}

.line {
    height: 1.5px;
    width: 55%;
    position: absolute;
    bottom: 0px;
    background-color: var(--color-border);
}
</style>