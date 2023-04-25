import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/config/firebaseConfig';

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'

import "./assets/main.css";

library.add(faChevronDown)
library.add(faCheck)

const app = createApp(App);

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
