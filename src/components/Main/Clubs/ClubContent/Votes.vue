<script setup lang="ts">

</script>

<template>
    <div>
        <h style="font-size: 1.8vw; color: var(--color-on-background)">Votes</h>
        <div class="votesContent">
            <div class="header">
                <p>Member</p>
                <p>Has Voted</p>
            </div>
            <div class="memberList">
                <div class="member">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <Icon icon="fa-solid fa-user-circle" size="xl" class="userIcon"/>
                        <p>Name</p>
                    </div>
                    
                    <Icon icon="fa-solid fa-circle-check" size="lg" class="inactiveHasVotedIcon" />
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
    border-radius: 1.8vw 1.8vw 0 0;
}

.header p {
    font-weight: bold;
}

.memberList {
    height: 11.5vw;
    padding: 0.5vw 2.5vw 0 1vw;
    background-color: white;
    border-radius: 0 0 1.8vw 1.8vw;
}

.member {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.userIcon {
    padding-right: 0.5vw;
}

.inactiveHasVotedIcon {
    color: var(--color-alt-on-background);
}

.activeHasVotedIcon {
    color: var(--color-positive);
}

</style>