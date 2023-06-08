import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from "../views/LandingPage/RouterViews/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPageView,
  },
  {
    path: "/clubs",
    name: "clubs",
    component: '<div></div>'
  },
  {
    path: "/books",
    name: "books",
    component: '<div></div>'
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LandingPage/RouterViews/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export { routes }
export default router;
