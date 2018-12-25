import Vue from 'vue';
import VueRouter from 'vue-router';

import Store from '../components/Store'
import ShoppingCart from '../components/ShoppingCart';
import Checkout from '../components/Checkout';
import Authentication from '../components/admin/Authentication';
import Admin from '../components/admin/Admin';
import AdminProducts from '../components/admin/Products';
import AdminOrders from '../components/admin/Orders';

import dataStore from '../store';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Store },
    { path: '/store', component: Store },
    { path: '/cart', component: ShoppingCart },
    { path: '/checkout', component: Checkout },
    { path: '/login', component: Authentication },
    { path: '/admin', component: Admin,
      beforeEnter(to, from, next) {
        if (dataStore.state.auth.authenticated) {
          next();
        } else {
          next('/login');
        }
      },
      children: [
        { path: 'products', component: AdminProducts },
        { path: 'orders', component: AdminOrders },
        { path: '', redirect: '/admin/products' }
      ]
    }
  ]
})
