<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">SPORTS STORE</a>
      </div>
    </div>
    <div class="row">
      <div class="col-3 p-2 bg-info">
        <categoty-controls/>
      </div>
      <div class="col-9 p-2 bg-success">
        <products-list/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from "./ProductsList";
import CategotyControls from "./CategoryControls";

export default {
  components: { ProductsList, CategotyControls }
}
</script>
