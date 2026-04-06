import type { RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DecadePage from '@/pages/DecadePage.vue'
import YearPage from '@/pages/YearPage.vue'
import NotFound from '@/pages/NotFound.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/:decade(\\d{4}s)',
    name: 'decade',
    component: DecadePage,
    props: true,
  },
  { path: '/:year(\\d{4})', name: 'year', component: YearPage, props: true },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]
