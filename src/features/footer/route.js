// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Footer,
} from './';

export default {
  path: 'footer',
  name: 'Footer',
  childRoutes: [
    { path: 'footer', name: 'Footer', component: Footer, isIndex: true },
  ],
};
