<script setup lang="ts">

</script>

<template>
    <div>
        <h style="font-size: 1.8vw; color: var(--color-on-background)">Next Meeting</h>
        <div class="nextMeeting">
            <div class="header">
                <p>Meeting #1</p>
            </div>
            <div class="nextMeetingContent">

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
    width: 13vw;
    border-radius: 1.8vw 1.8vw 0 0;
}

.header p {
    font-weight: bold;
}

.nextMeetingContent {
    height: 11.5vw;
    padding: 0.5vw 2.5vw 0 1vw;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
}
</style>