import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    categoriesList: [],
    currentPage: 1,
    perPage: 4,
    currentCategory: 'All'
  },
  getters: {
    productsFilteredByCategory: state => {
      if(state.currentCategory == 'All') {
        return state.products;
      } else {
        return state.products.filter((item) => item.category == state.currentCategory);
      }
    },
    currentPageProducts: (state, getters) => {
      let index = (state.currentPage - 1) * state.perPage;
      return getters.productsFilteredByCategory.slice(index, index + state.perPage);
    },
    pagesCount: (state, getters) => {
      return Math.ceil(getters.productsFilteredByCategory.length / state.perPage);
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
    setData(state, payload) {
      state.products = payload.pdata;
      state.categoriesList = payload.cdata;
    }
  },
  actions: {
    async loadData(context) {
      let pdata = (await Axios.get(productsUrl)).data;
      let cdata = (await Axios.get(categoriesUrl)).data
      context.commit('setData', { pdata, cdata });
    }
  }
})
