import { createRouter, createWebHistory } from 'vue-router';

import indexView from '../views/Indexview/index.vue';
import overView from '../views/overView/index.vue';
import mainView from '../views/main.vue';
import localView from '../views/localView/index.vue';
import blogView from '../views/blogView/index.vue';
import photoView from '../views/photoView/index.vue';

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
      {
        path: '/article',
        component: blogView,
      },
      {
        path: '/gallary',
        component: photoView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
