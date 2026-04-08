import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    alias: ['/au', '/au/'],
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/au/:decade(\\d{4}s)',
    name: 'decade',
    component: () => import('@/pages/DecadePage.vue'),
    props: true,
  },
  {
    path: '/au/:year(\\d{4})',
    name: 'year',
    component: () => import('@/pages/YearPage.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
]
