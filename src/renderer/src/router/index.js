import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const setupRouter = (app) => {
  app.use(router);
};

export default router;
