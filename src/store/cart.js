export default {
  namespaced: true,
  state: {
    lines: []
  },
  mutations: {
    addProduct(state, product) {
      let line = state.lines.find(line => line.product === product);
      if(line != null){
        line.quantity++;
      } else {
        state.lines.push({ product: product, quantity: 1 });
      }
    },
    removeLine(state, lineToRemove) {
      let index = state.lines.findIndex(line => line === lineToRemove);
      if (index > -1) {
        state.lines.splice(index, 1);
      }
    },
    incrementLineQuantity(state, lineToIncrement) {
      lineToIncrement.quantity++;
    },
    decrementLineQuantity(state, lineToDecrement) {
      lineToDecrement.quantity--;
    },
    setCartData(state, data) {
      state.lines = data;
    }
  },
  getters: {
    totalPrice(state) {
      return state.lines.reduce((memo, line) => memo + line.quantity * line.product.price, 0);
    },
    linesCount(state) {
      return state.lines.length;
    }
  },
  actions: {
    initializeCart(context, store) {
      context.dispatch('loadCartData');
      store.watch(state => state.cart.lines, () => context.dispatch("storeCartData"), { deep: true });
    },
    loadCartData(context) {
      let data = localStorage.getItem("cart");
      if(data != null) {
        context.commit("setCartData", JSON.parse(data));
      }
    },
    storeCartData(context) {
      localStorage.setItem("cart", JSON.stringify(context.state.lines));
    }
  }
}
