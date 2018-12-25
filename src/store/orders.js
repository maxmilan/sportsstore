import Axios from "axios";

const ORDERS_URL ="http://localhost:3500/orders";

export default {
  state: {
    orders: []
  },
  mutations: {
    setOrders(state, value) {
      state.orders = value;
    }
  },
  actions: {
    async storeOrder(context, order) {
      order.cartLines = context.rootState.cart.lines;
      return (await Axios.post(ORDERS_URL, order)).data.id;
    },
    async getOrders(context) {
      let orders = (await context.rootGetters.authenticatedAxios.get(ORDERS_URL)).data;
      context.commit('setOrders', orders);
    }
  }
}
