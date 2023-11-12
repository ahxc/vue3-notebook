import { createRouter, createWebHistory } from 'vue-router';
import CompositionAPI from '../components/CompositionAPI/index.vue';

const routes = [
  {
    path: '',
    redirect: '/CompositionAPI',
  },
  {
    path: '/CompositionAPI',
    name: 'CompositionAPI',
    component: CompositionAPI,
    meta: {
      keepAlive: true,
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;