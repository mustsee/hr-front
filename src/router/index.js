import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Advert from "../views/Advert.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/advert/:id?",
    name: "Advert",
    component: Advert,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
