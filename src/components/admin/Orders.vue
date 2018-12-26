<template>
  <div>
    <h4 class="bg-info text-white text-center p-2">
      Orders
    </h4>

    <toggle-button v-model="showShipped" color="#007bff"/>
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
            <th>
              Is shipped?
            </th>
          </tr>
        </thead>
        <tbody>
          <order v-for="order in displayOrders" :order="order" :key="order.id" @shipmentToggled="toggleShipment"/>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Order from "./Order";

export default {
  data() {
    return {
      showShipped: false
    }
  },
  components: { Order },
  computed: {
    ...mapState({ orders: state => state.orders.orders }),
    displayOrders() {
      return this.showShipped ? this.orders.filter(o => o.shipped == true) : this.orders
    }
  },
  methods: {
    ...mapActions(['getOrders', 'setOrderShipment']),
    toggleShipment(payload) {
      this.setOrderShipment(payload);
    }
  },
  created() {
    this.getOrders();
  }
}
</script>


