<script setup lang="ts">
import { watch } from 'vue';
import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';
const {
    message,
    alertIsVisible,
    alertIsPositive } = storeToRefs(useAlertStore());
watch(alertIsVisible, () => {
    if(alertIsVisible.value) setTimeout(() => alertIsVisible.value = false, 4000);
})
</script>

<template>
    <Transition name="fade">
        <div class="alert" :class="{ positive: alertIsPositive, negative: !alertIsPositive }">
            <p>{{ message }}</p>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
    transform: translateX(0px);
    opacity: 1;
}

.fade-enter-from {
    transform: translateX(25px);
    opacity: 0;
}

.fade-leave-to {
    transform: translateY(-100px);
    opacity: 0;
}

.alert {
    display: flex;
    align-items: center;
    padding: 0 1vw;
    min-width: 15vw;
    min-height: 4vw;
    border-radius: 0.5vw;
}

.positive {
    background-color: var(--color-positive);
    color: var(--color-on-positive);
}

.negative {
    background-color: var(--color-negative);
    color: var(--color-on-negative);
}
</style>