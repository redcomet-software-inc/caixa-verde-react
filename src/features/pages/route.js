// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Index,
  Login,
  Registration,
  Option,
  ShoppingCart,
  Checkout1,
  Kits,
} from './';

export default {
  path: 'pages',
  name: 'Pages',
  childRoutes: [
    { path: 'index', name: 'Index', component: Index, isIndex: true },
    { path: '/login', name: 'Login', component: Login },
    { path: '/cadastro', name: 'Registration', component: Registration },
    { path: '/preferencia', name: 'Option', component: Option },
    { path: '/carrinho', name: 'Shopping cart', component: ShoppingCart },
    { path: '/finalizar1', name: 'Checkout 1', component: Checkout1 },
    { path: '/kits', name: 'Kits', component: Kits },
  ],
};
