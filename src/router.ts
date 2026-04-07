import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
  {
    path: '/:decade(\\d{4}s)',
    name: 'decade',
    component: () => import('@/pages/DecadePage.vue'),
    props: true,
  },
  {
    path: '/:year(\\d{4})',
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
