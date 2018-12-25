<template>
  <div>
    <h4 class="bg-info text-white text-center p-2">
      Orders
    </h4>

    <toggle-button v-model="showShipped"/>
    Show shipped orders

    <h3 v-if="displayOrders.length == 0">
      There are no orders
    </h3>
    <div v-else>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th class="text-right">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in displayOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.name }}</td>
            <td>
              {{ `${order.city}, ${order.zip}` }}
            </td>
            <td class="text-right">
              {{ getTotal(order) | formattedPrice }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      showShipped: false
    }
  },
  computed: {
    ...mapState({ orders: state => state.orders.orders }),
    displayOrders() {
      return this.showShipped ? this.orders.filter(o => o.shipped == true) : this.orders
    }
  },
  methods: {
    ...mapActions(['getOrders']),
    getTotal(order) {
      return order.cartLines.reduce((memo, line) => memo + line.quantity * line.product.price, 0);
    }
  },
  created() {
    this.getOrders();
  }
}
</script>


