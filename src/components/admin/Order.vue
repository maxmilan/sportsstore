<template>
  <tr>
    <td>{{ order.id }}</td>
    <td>{{ order.name }}</td>
    <td>
      {{ `${order.city}, ${order.zip}` }}
    </td>
    <td class="text-right">
      {{ getTotal(order) | formattedPrice }}
    </td>
    <td class="text-center">
      <toggle-button :value="order.shipped" @change="shipmentToggled(order, $event)"/>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['order'],
  methods: {
    getTotal(order) {
      return order.cartLines.reduce((memo, line) => memo + line.quantity * line.product.price, 0);
    },
    shipmentToggled(order, event) {
      this.$emit('shipmentToggled', { order, value: event.value });
    }
  }
}
</script>
