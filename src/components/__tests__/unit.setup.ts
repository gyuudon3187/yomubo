import { config } from "@vue/test-utils"
import i18n from "../../i18n/index";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router"

const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(),
    routes
})

config.global.plugins = [i18n, pinia];
config.global.mocks.$t = (tKey: any) => tKey;