import { AddPost } from '../components/blog/AddPost/AddPost';
import { EditPost } from '../components/blog/EditPost/EditPost';
import MLoginPage from '../components/blog/MainLogin';
import { FAQ } from '../components/faq/FAQ';
import Contacts from '../components/trainings/Contacts';
import IRoute from '../interfaces/route';
import Blog from '../pages/blog/blog';
import FullPost from '../pages/blog/fullpost';

const authRoutes: IRoute[] = [
  {
    name: 'Login',
    path: '/blog/login',
    exact: true,
    component: MLoginPage,
    auth: false,
  },
  {
    name: 'Sign Up',
    path: '/blog/register',
    exact: true,
    component: MLoginPage,
    auth: false,
  },
];

const blogRoutes: IRoute[] = [
  {
    name: 'AddPost',
    path: '/blog/addpost',
    exact: true,
    component: AddPost,
    auth: true,
  },
  {
    name: 'Edit',
    path: '/blog/posts/:id/edit',
    exact: true,
    component: AddPost,
    auth: true,
  },
  {
    name: 'EditPost',
    path: '/blog/editpost',
    exact: true,
    component: EditPost,
    auth: true,
  },
  {
    name: 'Post',
    path: '/blog/posts/:id',
    exact: true,
    component: FullPost,
    auth: false,
  },
  {
    name: 'Blog',
    path: '/blog',
    exact: true,
    component: Blog,
    auth: false,
  },
];

const mainRoutes: IRoute[] = [
  // {
  //   name: 'Home',
  //   path: '/',
  //   exact: true,
  //   component: ,
  //   auth: false,
  // },
  {
    name: 'Contacts',
    path: '/contacts',
    exact: true,
    component: Contacts,
    auth: false,
  },
  {
    name: 'FAQ',
    path: '/faq',
    exact: true,
    component: FAQ,
    auth: false,
  },
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
