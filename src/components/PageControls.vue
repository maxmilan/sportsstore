<template>
  <div class="row mt-2">
    <div class="col form-group">
      <select v-bind:value="perPage" v-on:change="updatePerPage" class="form-control">
                <option value="4">4 per page</option>
                <option value="8">8 per page</option>
                <option value="12">12 per page</option>
      </select>
    </div>
    <div class="text-right col">
      <div v-if="pagesCount > 1" class="btn-group mx-2">
        <button v-for="i in pageNumbers" v-bind:key="i"
                class="btn btn-secpmdary"
                v-bind:class="{ 'btn-primary': i == currentPage }"
                v-on:click="setCurrentPage(i)"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(['currentPage', 'perPage']),
    ...mapGetters(['pagesCount']),
    pageNumbers() {
      return Array.from(Array(this.pagesCount + 1).keys()).slice(1);
    }
  },
  methods: {
    ...mapMutations(['setCurrentPage', 'setPageSize']),
    updatePerPage(event) {
      this.setPageSize(Number(event.target.value));
    }
  }
}
</script>
