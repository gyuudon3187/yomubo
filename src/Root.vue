<script setup lang="ts">
import App from "./App.vue";
import { useLoadingStore } from "./stores/loading";

</script>

<template>
    <Suspense>
        <template #default>
            <App />
        </template>
        <template #fallback>
            <span>Loading ...</span>
        </template>
    </Suspense>
</template>

<style scoped>
</style>
