<template>
  <div class="container-fluid">
    <div class="row my-2" v-for="category in categories" v-bind:key="category">
      <button class="btn btn-block" v-bind:class="category == currentCategory ? 'btn-primary' : 'btn-secondary'"
                                    v-on:click="setCurrentCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['currentCategory']),
    ...mapGetters(['categories'])
  },
  methods: {
    ...mapMutations(['setCurrentCategory'])
  }
}
</script>
