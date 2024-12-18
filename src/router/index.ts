import { createRouter, createWebHistory } from 'vue-router';

import indexView from '../views/Indexview/index.vue';
import overView from '../views/overView/index.vue';
import mainView from '../views/main.vue';
import localView from '../views/localView/index.vue';

const routes = [
  {
    path: '/',
    component: mainView,
    children: [
      {
        path: '/over',
        component: overView,
      },
      {
        path: '/local',
        component: localView,
      },
      {
        path: '/main',
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
