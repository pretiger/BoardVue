import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const LoginPage = () => import('@/views/LoginPage');
const JoinPage = () => import('@/views/JoinPage');
const BoardListPage = () => import('@/views/BoardListPage');
const BoardDetailPage = () => import('@/views/BoardDetailPage');
const UpdatePage = () => import('@/views/UpdatePage');
const ReplyPage = () => import('@/views/ReplyPage');
const BoardWritePage = () => import('@/views/BoardWritePage');

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BoardListPage',
      component: BoardListPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/join',
      name: 'JoinPage',
      component: JoinPage,
    },
    {
      path: '/write',
      name: 'BoardWritePage',
      component: BoardWritePage,
    },
    {
      path: '/detail/:num',
      name: 'BoardDetailPage',
      component: BoardDetailPage,
    },
    {
      path: '/update/:num',
      name: 'UpdatePage',
      component: UpdatePage,
    },
    {
      path: '/reply/:num',
      name: 'ReplyPage',
      component: ReplyPage,
    },
  ],
});
