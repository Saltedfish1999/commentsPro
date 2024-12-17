import { createRouter, createWebHistory } from "vue-router";

import indexView from "../views/Indexview/index.vue";
import overView from "../views/Overview/index.vue";
import mainView from "../views/main.vue";

const routes = [
  {
    path: "/",
    component: mainView,
    children: [
      {
        path: "/over",
        component: overView,
      },
      {
        path: "/main",
        component: indexView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
