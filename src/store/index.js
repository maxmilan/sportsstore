import Vue from "vue";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import Axios from "axios";

import CartModule from "./cart";
import OrdersModule from "./orders";
import AuthModule from "./auth";

Vue.use(Vuex);
Vue.use(Vuelidate);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
  strict: true,
  modules: { cart: CartModule, orders: OrdersModule, auth: AuthModule },
  state: {
    categoriesList: [],
    currentPage: 1,
    perPage: 4,
    currentCategory: 'All',
    pages: {},
    productsCount: 0,
    searchString: ''
  },
  getters: {
    products: state => {
      return state.pages[state.currentPage];
    },
    pagesCount: (state) => {
      return Math.ceil(state.productsCount / state.perPage);
    },
    categories: state => {
      return ['All', ...Array.from(state.categoriesList).sort()];
    }
  },
  mutations: {
    setCurrentPage(state, value) {
      state.currentPage = value;
    },
    setPageSize(state, value) {
      state.perPage = value;
      state.currentPage = 1;
    },
    setCurrentCategory(state, value) {
      state.currentCategory = value;
      state.currentPage = 1;
    },
    setCategoriesList(state, value) {
      state.categoriesList = value;
    },
    setProductsCount(state, value) {
      state.productsCount = value;
    },
    addPage(state, payload) {
      Vue.set(state.pages, payload.page, payload.data);
    },
    clearPages(state) {
      state.pages = {};
    },
    setSearchString(state, value) {
      state.searchString = value;
    }
  },
  actions: {
    async loadData(context) {
      context.commit('setCategoriesList', (await Axios.get(categoriesUrl)).data);
      await context.dispatch('getProductsPage');
    },
    async getProductsPage(context) {
      let url = `${productsUrl}?_page=${context.state.currentPage}&_limit=${context.state.perPage}`;
      if (context.state.currentCategory != 'All') {
        url += `&category=${context.state.currentCategory}`;
      }
      if (context.state.searchString != '') {
        url += `&q=${context.state.searchString}`;
      }
      let response = await Axios.get(url);
      context.commit('setProductsCount', Number(response.headers['x-total-count']));
      context.commit('addPage', { page: context.state.currentPage, data: response.data });
    },
    async deleteProduct(context, product) {
      await context.rootGetters.authenticatedAxios.delete(`${productsUrl}/${product.id}`);
      context.commit('clearPages');
      context.dispatch('getProductsPage');
    },
    setCurrentPage(context, value) {
      context.commit('setCurrentPage', value);
      if (!context.state.pages[value]) {
        context.dispatch('getProductsPage');
      }
    },
    setPageSize(context, value) {
      context.commit('clearPages');
      context.commit('setPageSize', value);
      context.dispatch('getProductsPage');
    },
    setCurrentCategory(context, value) {
      context.commit('clearPages');
      context.commit('setCurrentCategory', value);
      context.dispatch('getProductsPage');
    },
    submitSearch(context, value) {
      context.commit('setSearchString', value);
      context.commit('clearPages');
      context.dispatch('getProductsPage');
      context.commit('setCurrentPage', 1);
    }
  }
})
