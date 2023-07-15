import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import LandingPageView from "../views/LandingPage/RouterViews/HomeView.vue";
import ClubsView from "@/views/MainPage/ClubsView.vue";
import ClubHomeView from "@/views/MainPage/ClubHomeView.vue";
import MeetingView from "@/views/MainPage/MeetingView.vue";
import CreateClubView from '@/views/MainPage/CreateClubView.vue'
import MyClubsSidebarView from '@/views/MainPage/MyClubsSidebarView.vue'
import FindClubsSidebarView from '@/views/MainPage/FindClubsSidebarView.vue'
import CreateClubSidebarView from '@/views/MainPage/CreateClubSidebarView.vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import FindClubsView from '@/views/MainPage/FindClubsView.vue'
const { listenToAuthChanges } = useAuthStore();
const isAuthenticated = await listenToAuthChanges();

const routes = [
  {
    path: "/",
    name: "home",
    component: ClubsView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: ClubHomeView,
      }
    ]
  },
  {
    path: "/myClubs",
    name: "myClubs",
    components: { 
      default: ClubsView,
      MyClubsSidebarView
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: ClubHomeView
      },
      {
        path: 'meeting',
        component: MeetingView
      }
    ]
  },
  {
    path: "/findClubs",
    name: "findClubs",
    components: { 
      default: ClubsView,
      FindClubsSidebarView
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: FindClubsView
      }
    ]
  },
  {
    path: "/createClub",
    name: "createClub",
    components: { 
      default: ClubsView,
      CreateClubSidebarView
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: CreateClubView
      }
    ]
  },
  {
    path: "/books",
    name: "books",
    component: '<div></div>',
    meta: { requiresAuth: true }
  },
  {
    path: "/landing",
    name: "landing",
    component: LandingPageView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LandingPage/RouterViews/AboutView.vue"),
  },
] as Array<RouteRecordRaw>;

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
  scrollBehavior(to) {
    if(to.hash) {
      return {
        top: 650,
        behavior: "smooth"
      }
    }
  }
});

router.beforeEach((to, from) => {
  if(to.meta.requiresAuth && isAuthenticated.value) {
    if(to.name === 'home') return { path: '/myClubs' };
  }

  if(isAuthenticated.value && to.name === 'landing') return { name: 'myClubs' };

  if(!isAuthenticated.value && to.path === '/') return { name: 'landing' };
  if(!isAuthenticated.value && to.path === '/myClubs') return { name: 'landing' };
})

export { routes }
export default router;
