<template>
  <div>
    <div v-for="product in products" :key="product.id" class="card m-1 p-1 bg-light">
      <h4>
        {{product.name}}
          <span class="badge badge-pill badge-primary float-right">
            {{ product.price | formattedPrice }}
          </span>
      </h4>
      <div class="card-text bg-white p-1">
        {{ product.description }}
        <button class="btn btn-success btn-sm float-right" @click="addToCart(product)">
          Add to cart
        </button>
      </div>
    </div>
    <page-controls :perPage="perPage" :pagesCount="pagesCount" :currentPage="currentPage"
                   @perPageUpdated="setPageSize" @currentPageUpdated="setCurrentPage"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import PageControls from "./PageControls"

export default {
  components: { PageControls},
  methods: {
    ...mapMutations({ addProduct: "cart/addProduct" }),
    ...mapActions({ setPageSize: "setPageSize", setCurrentPage: "setCurrentPage" }),
    addToCart(product) {
      this.addProduct(product);
    }
  },
  computed: {
    ...mapState(['currentPage', 'perPage']),
    ...mapGetters(['pagesCount', 'products'])
   }
}
</script>
