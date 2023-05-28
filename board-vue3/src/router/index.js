import { createRouter, createWebHistory } from 'vue-router';
const BoardListPage = () => import('@/views/BoardListPage.vue');
const LoginPage = () => import('@/views/LoginPage.vue');
const JoinPage = () => import('@/views/JoinPage.vue');
const WritePage = () => import('@/views/WritePage.vue');
const DetailPage = () => import('@/views/DetailPage.vue');
const UpdatePage = () => import('@/views/UpdatePage.vue');
const ReplyPage = () => import('@/views/ReplyPage.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: BoardListPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/join',
    name: 'join',
    component: JoinPage,
  },
  {
    path: '/write',
    name: 'write',
    component: WritePage,
  },
  {
    path: '/detail/:num',
    name: 'detail',
    component: DetailPage,
  },
  {
    path: '/update/:num',
    name: 'update',
    component: UpdatePage,
  },
  {
    path: '/reply/:num',
    name: 'reply',
    component: ReplyPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
