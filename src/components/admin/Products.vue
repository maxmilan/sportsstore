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
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price | formattedPrice }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteProduct(product)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <page-controls :perPage="perPage" :currentPage="currentPage" :pagesCount="pagesCount"
                   @perPageUpdated="setPageSize" @currentPageUpdated="setCurrentPage"/>
  </div>
</template>

<script>
import PageControls from "../PageControls";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  components: { PageControls },
  computed: {
    ...mapState(['currentPage', 'perPage']),
    ...mapGetters(['pagesCount', 'products'])
  },
  methods: {
    ...mapActions({ setPageSize: "setPageSize", setCurrentPage: "setCurrentPage", deleteProduct: "deleteProduct" })
  }
}
</script>

