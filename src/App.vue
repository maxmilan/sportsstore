<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',
  methods: {
    ...mapActions({ loadData: 'loadData', initializeCart: 'cart/initializeCart' })
  },
  created() {
    this.loadData();
    this.initializeCart(this.$store);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
