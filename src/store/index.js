import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const testData = [];
for (let i = 1; i <= 10; i++) {
  testData.push({
    id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
    description: `This is Product #${i}`, price: i * 50
  })
}

export default new Vuex.Store({
  strict: true,
  state: {
    products: testData,
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
      return ['All', ...Array.from(new Set(state.products.map((item) => item.category))).sort()]
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
    }
  }
})
