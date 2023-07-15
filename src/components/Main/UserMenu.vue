<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const { logOut } = useAuthStore();
const router = useRouter();

const isVisible = ref(false);

function signOut() {
    logOut();
    router.push({ name: 'landing' })
}

function test() {
    console.log("test")
    isVisible.value = false
}
</script>

<template>
    <div class="wrapper-1">
        <div class="wrapper-2" :class="{ welp: isVisible }" @mouseleave="() => isVisible = false">
            <nav>
                <div>
                    <RouterLink v-show="isVisible" to="/">My Profile</RouterLink>
                    <Icon @mouseover="() => isVisible = true" icon="fa-solid fa-user-circle" size="2xl" class="userIcon"/>
                </div>
                <RouterLink v-show="isVisible" to="/">Notifications</RouterLink>
                <RouterLink v-show="isVisible" to="/">Settings</RouterLink>
                <p v-show="isVisible" @click="signOut">Log out</p>
            </nav>
            
        </div>
    </div>
    
</template>

<style scoped>
.wrapper-1 {
    width: 170px;
    height: 60px;
}

.wrapper-2 {
    position: absolute;
    z-index: 2;
    margin-right:0px;
    border-radius: 5%;
    width: 176px;
    height: 140px;
    user-select: none;
    display: flex;
    justify-content: flex-end;
}
.welp {
    background-color: var(--vt-c-beige);
    transition: all 200ms;
}

.welp .userIcon {
    transform: translateX(-120px);
}

.userIcon {
    transition: all ease-in-out 200ms;
    margin-left: auto;
}

nav {
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 13px 10px;
}

nav p {
    cursor: pointer;
}

.options {
    margin-top: 5px;
}
</style>