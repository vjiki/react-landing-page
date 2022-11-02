import IRoute from '../interfaces/route';
import BlogPage from '../pages/mblog/blog';
import EditPage from '../pages/mblog/edit';
import HomePage from '../pages/mblog/home';
import LoginPage from '../pages/mblog/login';

const authRoutes: IRoute[] = [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: LoginPage,
    auth: false,
  },
  {
    name: 'Sign Up',
    path: '/register',
    exact: true,
    component: LoginPage,
    auth: false,
  },
];

const blogRoutes: IRoute[] = [
  {
    name: 'Create',
    path: '/edit',
    exact: true,
    component: EditPage,
    auth: true,
  },
  {
    name: 'Edit',
    path: '/edit/:blogID',
    exact: true,
    component: EditPage,
    auth: true,
  },
  {
    name: 'Blog',
    path: '/blogs/:blogID',
    exact: true,
    component: BlogPage,
    auth: false,
  },
];

const mainRoutes: IRoute[] = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: HomePage,
    auth: false,
  },
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
