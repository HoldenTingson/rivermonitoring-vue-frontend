import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";
import App from "../App.vue";
import HomeView from "../views/HomeView.vue";
import NewsView from "../views/NewsView.vue";
import RiverView from "../views/RiverView.vue";
import FaqView from "../views/FaqView.vue";
import GalleryView from "../views/GalleryView.vue";
import ReportView from "../views/ReportView.vue";
import ProfileView from "../views/ProfileView.vue";
import NewsDetailView from "../views/NewsDetailView.vue";
import ForgotPasswordView from "../views/ForgotPassword.vue";
import CreatePasswordView from "../views/CreatePasswordView.vue";
const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/river",
          name: "river",
          component: RiverView,
        },
        {
          path: "/news",
          name: "news",
          component: NewsView,
        },
        {
          path: "/report",
          name: "report",
          component: ReportView,
        },
        {
          path: "/faq",
          name: "faq",
          component: FaqView,
        },
        {
          path: "/gallery",
          name: "gallery",
          component: GalleryView,
        },

        {
          path: "/profile",
          name: "profile",
          component: ProfileView,
          meta: { requiresAuth: true },
        },
        {
          path: "/newsDetail/:newsId",
          name: "newsDetail",
          component: NewsDetailView,
        },
      ],
    },
    {
      path: "/forgotPassword",
      component: ForgotPasswordView,
    },
    {
      path: "/createPassword",
      component: CreatePasswordView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.authenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
