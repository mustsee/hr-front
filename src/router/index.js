import Vue from "vue";
import VueRouter from "vue-router";
import Jobs from "../views/Jobs.vue";
import Job from "../views/Job.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Jobs",
    component: Jobs,
  },
  {
    path: "/job/:id?",
    name: "Job",
    component: Job,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
