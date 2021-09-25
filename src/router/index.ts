import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dexie from "../views/dexie.vue";
import IndexDB from "../views/indexdb.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dexie",
    name: "dexie",
    component: Dexie,
  },
  {
    path: "/indexDB",
    name: "indexDB",
    component: IndexDB,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
