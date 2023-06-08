import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/config/firebaseConfig';

import Root from "./Root.vue";
import router from "./router";
import i18n from "./i18n";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faChevronDown, 
    faCheck, 
    faUserCircle, 
    faHouse,
    faBook,
    faCheckToSlot,
    faMessage,
    faGear,
    faCircleCheck
     } from '@fortawesome/free-solid-svg-icons'

import "./assets/main.css";

library.add(faChevronDown)
library.add(faCheck)
library.add(faUserCircle)
library.add(faHouse)
library.add(faBook)
library.add(faCheckToSlot)
library.add(faMessage)
library.add(faGear)
library.add(faCircleCheck)

const app = createApp(Root);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
})
app.component('Icon', FontAwesomeIcon)

app.mount("#app");
