import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TechnicalDashboard from '@/pages/TechnicalDashboard.vue';
import BusinessDashboard from '@/pages/BusinessDashboard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/technical'
  },
  {
    path: '/technical',
    name: 'Technical',
    component: TechnicalDashboard
  },
  {
    path: '/business',
    name: 'Business',
    component: BusinessDashboard
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
