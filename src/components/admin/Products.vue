<template>
  <div>
    <table class="table table-sm table-bordered">
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
      </thead>
      <tbody>
        <product v-for="product in products" :product="product" :key="product.id"
                 @productDeleted="deleteProduct" @productNameChanged="updateProductName"/>
      </tbody>
    </table>
    <page-controls :perPage="perPage" :currentPage="currentPage" :pagesCount="pagesCount"
                   @perPageUpdated="setPageSize" @currentPageUpdated="setCurrentPage"/>
  </div>
</template>

<script>
import PageControls from "../PageControls";
import Product from "./Product";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: { Product, PageControls },
  computed: {
    ...mapState(['currentPage', 'perPage']),
    ...mapGetters(['pagesCount', 'products'])
  },
  methods: {
    ...mapActions({
      setPageSize: "setPageSize", setCurrentPage: "setCurrentPage", deleteProduct: "deleteProduct",
      updateProductName: "updateProductName"
    })
  }
}
</script>

