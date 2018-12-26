<template>
  <tr>
    <td>{{ product.id }}</td>
    <td>
      <input v-if="editName" type="text" @keyup="updateCachedName" @keyup.enter="toggleNameEdit" :value="product.name">
      <span v-else>{{ product.name }}</span>
      <i class="fa fa-pencil" @click="toggleNameEdit"></i>
    </td>
    <td>{{ product.category }}</td>
    <td>{{ product.description }}</td>
    <td>{{ product.price | formattedPrice }}</td>
    <td>
      <button class="btn btn-danger" @click="productDeleted(product)">
        Delete
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      editName: false,
      cachedName: ''
    }
  },
  methods: {
    productDeleted(product) {
      this.$emit('productDeleted', product);
    },
    updateCachedName(event) {
      this.cachedName = event.target.value;
    },
    toggleNameEdit() {
      if (this.editName == true) {
        this.editName = false;
        this.$emit('productNameChanged', { product: this.product, value: this.cachedName });
      } else {
        this.editName = true;
      }
    }
  },
  created() {
    this.cachedName = this.product.name;
  }
}
</script>
