<template>
 <tr>
   <td>
    <button @click="sendDecrementQuantityEvent"
            :disabled="qvalue <= 1"
            class="btn btn-warning">
      <i class="fa fa-minus"/>
    </button>
    {{ qvalue }}
    <button @click="sendIncrementQuantityEvent" class="btn btn-success"><i class="fa fa-plus"/></button>
   </td>
   <td>{{ line.product.name }}</td>
   <td>{{ line.product.price | formattedPrice }}</td>
   <td>{{ subtotal | formattedPrice }}</td>
   <td class="text-center">
     <button @click="sendRemoveEvent" class="btn btn-sm btn-danger">
       Remove
     </button>
   </td>
 </tr>
</template>

<script>
export default {
  props: ['line'],
  computed: {
    subtotal() {
      return this.line.product.price * this.line.quantity;
    },
    qvalue() {
      return this.line.quantity;
    }
  },
  methods: {
    sendRemoveEvent() {
      this.$emit("remove", this.line);
    },
    sendIncrementQuantityEvent() {
      this.$emit('incrementQuantity', this.line);
    },
    sendDecrementQuantityEvent() {
      this.$emit('decrementQuantity', this.line);
    }
  }
}
</script>

