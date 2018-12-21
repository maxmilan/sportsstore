<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">SPORTS STORE</a>
      </div>
    </div>
    <div v-if="lines.length > 0">
      <h2 class="text-center">
        Your cart
      </h2>
      <table class="table table-bordered table-striped p-2">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th class="text-right">Price</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <cart-line v-for="line in lines"
                     :key="line.product.id"
                     :line="line"
                     @remove="remove"
                     @incrementQuantity="incrementQuantity"
                     @decrementQuantity="decrementQuantity"/>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">
              Total:
            </td>
            <td>
              {{ totalPrice | formattedPrice }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else>
      <h3>
        Your cart is empty
      </h3>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-center">
          <router-link to="/" class="btn btn-secondary m-1">
            {{ lines.length > 0 ? 'Continue shopping' : 'Start shopping' }}
          </router-link>
          <router-link to="/checkout" class="btn btn-primary m-1" v-show="lines.length > 0">
            Checkout
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import CartLine from './ShoppingCartLine';

export default {
  components: { CartLine },
  computed: {
    ...mapState({ lines: state => state.cart.lines }),
    ...mapGetters({ totalPrice: 'cart/totalPrice' })
  },
  methods: {
    ...mapMutations({ remove: 'cart/removeLine',
                      incrementQuantity: 'cart/incrementLineQuantity',
                      decrementQuantity: 'cart/decrementLineQuantity' })
  }
}
</script>
