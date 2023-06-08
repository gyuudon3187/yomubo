<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
const { logOut } = useAuthStore();

const isVisible = ref(false);
</script>

<template>
    <div @mouseover="() => isVisible = true" @mouseout="() => isVisible = false" class="wrapper-1">
        <div class="wrapper-2" >
            <nav>
                <div class="wrapper-3">
                    <RouterLink v-show="isVisible" to="/">My Profile</RouterLink>
                    <Icon icon="fa-solid fa-user-circle" size="2xl" class="userIcon"/>
                </div>
                <RouterLink v-show="isVisible" to="/clubs">Notifications</RouterLink>
                <RouterLink v-show="isVisible" to="/clubs">Settings</RouterLink>
                <p v-show="isVisible" @click="logOut">Log out</p>
            </nav>
            
        </div>
    </div>
    
</template>

<style scoped>
.wrapper-1 {
    width: 247px;
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
.wrapper-2:hover {
    background-color: var(--vt-c-beige);
    transition: all 200ms;
}

.wrapper-2:hover .userIcon {
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