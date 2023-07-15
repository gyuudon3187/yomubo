import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia, storeToRefs } from "pinia";
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/config/firebaseConfig';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import Root from "./Root.vue";
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
    faCircleCheck,
    faUserGroup,
    faLanguage,
    faUsers,
    faGaugeHigh,
    faVenusMars,
    faMasksTheater,
    faCircleXmark,
    faPen,
    faEye,
    faCaretSquareLeft,
    faCaretSquareUp,
    faCaretSquareRight,
    faCaretSquareDown,
    faPlus,
    faTrash,
    faSave,
    faMagnifyingGlass,
    faBookOpen
     } from '@fortawesome/free-solid-svg-icons'

import "./assets/main.css";
import { useAuthStore } from "./stores/auth";

const icons = [
    faChevronDown,
    faCheck,
    faUserCircle,
    faHouse,
    faBook,
    faBookOpen,
    faCheckToSlot,
    faMessage,
    faGear,
    faCircleCheck,
    faUserGroup,
    faLanguage,
    faUsers,
    faGaugeHigh,
    faVenusMars,
    faMasksTheater,
    faCircleXmark,
    faPen,
    faEye,
    faCaretSquareLeft,
    faCaretSquareUp,
    faCaretSquareRight,
    faCaretSquareDown,
    faPlus,
    faTrash,
    faSave,
    faMagnifyingGlass
]

icons.forEach(icon => library.add(icon));

const app = createApp(Root);

// app.use(createPinia());
// import('./router').then(res => app.use(res.default))
// // app.use(router);
// app.use(i18n);
// app.use(VueFire, {
//     firebaseApp,
//     modules: [
//         VueFireAuth()
//     ]
// })
// app.component('Icon', FontAwesomeIcon)

// app.mount("#app");

createApp(Root)
    .use(createPinia())
    .use((await import('./router')).default)
    .use(i18n).use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ]
}).component('Icon', FontAwesomeIcon).mount('#app');