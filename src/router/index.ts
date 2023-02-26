import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from "../views/LandingPage/RouterViews/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPageView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LandingPage/RouterViews/AboutView.vue"),
    },
  ],
});

export default router;
