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
                v-on:click="updateCurrentPage(i)"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['perPage', 'pagesCount', 'currentPage'],
  computed: {
    pageNumbers() {
      return Array.from(Array(this.pagesCount + 1).keys()).slice(1);
    }
  },
  methods: {
    updatePerPage(event) {
      this.$emit('perPageUpdated', Number(event.target.value));
    },
    updateCurrentPage(value) {
      this.$emit('currentPageUpdated', value);
    }
  }
}
</script>
