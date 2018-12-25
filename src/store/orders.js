import Axios from "axios";
import Vue from "vue";

const ORDERS_URL ="http://localhost:3500/orders";

export default {
  state: {
    orders: []
  },
  mutations: {
    setOrders(state, value) {
      state.orders = value;
    },
    setOrderShipment(state, payload) {
      Vue.set(payload.order, 'shipped', payload.value);
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
    },
    async setOrderShipment(context, payload) {
      context.commit('setOrderShipment', payload);
      await context.rootGetters.authenticatedAxios.put(`${ORDERS_URL}/${payload.order.id}`, payload.order);
    }
  }
}
