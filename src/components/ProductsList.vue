<template>
  <div>
    <div v-for="product in currentPageProducts" v-bind:key="product.id" class="card m-1 p-1 bg-light">
      <h4>
        {{product.name}}
          <span class="badge badge-pill badge-primary float-right">
            {{ product.price | formattedPrice }}
          </span>
      </h4>
      <div class="card-text bg-white p-1">{{ product.description }}</div>
    </div>
    <page-controls/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageControls from "./PageControls"

export default {
  components: { PageControls},
  computed: {
    ...mapGetters(['currentPageProducts'])
   },
  filters: {
    formattedPrice(value) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    }
  }
}
</script>
