import {
  MainPage,
} from './MainPage';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'MainPage',
      name: 'MainPage',
      component: MainPage,
      isIndex: true,
    },
  ],
};
