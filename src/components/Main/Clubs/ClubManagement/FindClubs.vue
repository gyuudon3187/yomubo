<script setup lang="ts">

</script>

<template>
    <div>
        <div class="findClubsTitle">
            <p style="color: var(--color-on-background)">Find Clubs</p>
            <div class="line"></div>
        </div>
        <div class="findClubs"></div>
    </div>
</template>

<style scoped>
.findClubsTitle {
    font-size: 2vw;
    bottom: -0.6vw;
}

.findClubs {
    width: 14.05vw;
    max-height: 22vw;
    overflow-y: auto;

}

.line {
    height: 1.5px;
    width: 55%;
    position: absolute;
    bottom: 0px;
    background-color: var(--color-border);
}
</style>