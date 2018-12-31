// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Categories,
} from './';

export default {
  path: 'components',
  name: 'Components',
  childRoutes: [
    { path: 'categories', name: 'Categories', component: Categories, isIndex: true },
  ],
};
