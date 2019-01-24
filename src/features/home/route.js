import {
  App, MainPage
} from './';

export default {
  path: 'home',
  name: 'Home',
  childRoutes: [
    { path: '/', name: 'App', component: App,  isIndex: true },
    { path: '/home', name: 'MainPage', component: MainPage },
  ],
};

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html



