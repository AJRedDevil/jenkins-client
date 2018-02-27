// our packages
import Home from '../scenes/Home';
import Settings from '../scenes/Settings';

const appRoutes = [
  {
    path: '/home',
    component: Home,
    key: 'home',
  },
  {
    path: '/settings',
    component: Settings,
    key: 'settings',
  },
  {
    redirect: true,
    path: '/',
    to: '/home',
    key: 'home',
  },
];

export default appRoutes;
