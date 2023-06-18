<script setup lang="ts">
const titlesAndDescriptions = [
    { title: "Type", description: "Physical" },
    { title: "Time & Date", description: "2022/06/26 15:00" },
    { title: "Location", description: "Café Blåbär" },
]
</script>

<template>
    <div>
        <p style="font-size: 1.8vw; color: var(--color-on-background)">Next Meeting</p>
        <div class="nextMeeting">
            <div class="header">
                <p>Meeting #1</p>
            </div>
            <div class="nextMeetingContent">
                <div v-for="data in titlesAndDescriptions" class="titleAndDescription">
                    <p style="color: var(--color-on-background)">{{ data.title }}</p>
                    <p style="color: var(--color-alt-on-background);">{{ data.description }}</p>
                </div>
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
    overflow-y: auto;
}

.titleAndDescription {
    font-size: smaller;
}

.titleAndDescription h {
    color: var(--color-on-background);
}

.titleAndDescription p {
    color: var(--color-alt-on-background);
}
</style>