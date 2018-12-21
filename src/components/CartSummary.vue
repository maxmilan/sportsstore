<template>
  <div class="float-right">
    <router-link to="/cart" class="btn btn-lg bg-dark text-white">
      <i class="fa fa-shopping-cart"></i>
    </router-link>
    <span v-show="itemsCount > 0" class="badge badge-notify">{{ itemsCount }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ itemsCount: 'cart/linesCount' })
  }
}
</script>

<style>
  .badge-notify{
    background:red;
    position:relative;
    top: -10px;
    left: -15px;
  }
</style>
