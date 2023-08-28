import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsView from "../views/NewsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RiverView from "../views/RiverView.vue";
import FaqView from "../views/FaqView.vue";
import GalleryView from "../views/GalleryView.vue";
import ReportView from "../views/ReportView.vue";
import ProfileView from "../views/ProfileView.vue";
import NewsDetailView from "../views/NewsDetailView.vue";
import Photo from "../views/Photo.vue";

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }; // Scroll to the top of the page
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/river",
      name: "river",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RiverView,
    },
    {
      path: "/news",
      name: "news",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: NewsView,
    },
    {
      path: "/report",
      name: "report",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ReportView,
    },
    {
      path: "/faq",
      name: "faq",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FaqView,
    },
    {
      path: "/gallery",
      name: "gallery",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: GalleryView,
    },
    {
      path: "/photo/:id",
      name: "photo",
      component: Photo,
    },
    {
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ProfileView,
    },
    {
      path: "/newsDetail/:newsId",
      name: "newsDetail",
      component: NewsDetailView,
    },
  ],
});

export default router;
