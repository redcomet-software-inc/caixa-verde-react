// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Option,
  Registration,
  Login,
  Products,
  Kits,
  ShoppingCart,
  Checkout,
  MyAccount,
  MyOrders,
  Payment,
  MyBox,
} from './';

export default {
  path: 'pages',
  name: 'Pages',
  childRoutes: [
    { path: '/preferencia', name: 'Option', component: Option },
    { path: '/cadastro', name: 'Registration', component: Registration },
    { path: '/login', name: 'Login', component: Login },
    { path: '/Products', name: 'Products', component: Products },
    { path: '/kits', name: 'Kits', component: Kits },
    { path: '/carrinho', name: 'Shopping cart', component: ShoppingCart },
    { path: '/checkout', name: 'Checkout', component: Checkout },
    { path: '/minhaconta', name: 'My account', component: MyAccount },
    { path: '/pedidos', name: 'My orders', component: MyOrders },
    { path: '/pagamento', name: 'Payment', component: Payment },
    { path: '/minhacaixa', name: 'My box', component: MyBox, isIndex: true },
    
  ],
};
