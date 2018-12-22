<template>
  <div class="row mt-2">
    <div class="col-3 form-group">
      <select v-bind:value="perPage" v-on:change="updatePerPage" class="form-control">
                <option value="4">4 per page</option>
                <option value="8">8 per page</option>
                <option value="12">12 per page</option>
      </select>
    </div>
    <div class="col-9 text-right">
      <div v-if="pagesCount > 1" class="btn-group mx-2">
        <button @click="updateCurrentPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="btn btn-secondary mx-1">
          Prev
        </button>
        <span v-if="currentPage > 4">
          <button @click="updateCurrentPage(1)"
                  class="btn btn-secondary mx-1">
            1
          </button>
          <span class="h4">...</span>
        </span>
        <span class="mx-1">
          <button v-for="i in pageNumbers" v-bind:key="i"
                  class="btn btn-secpmdary"
                  :class="{ 'btn-primary': i == currentPage }"
                  @click="updateCurrentPage(i)">
            {{ i }}
          </button>
        </span>
        <span v-if="currentPage <= pagesCount - 4">
          <span class="h4">...</span>
          <button @click="updateCurrentPage(pagesCount)"
                  class="btn btn-secondary mx-1">
            {{ pagesCount }}
          </button>
        </span>
        <button @click="updateCurrentPage(currentPage + 1)"
                :disabled="currentPage === pagesCount"
                class="btn btn-secondary mx-1">
          Next
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
      if (this.pagesCount < 4) {
        return [...Array(this.pagesCount + 1).keys()].slice(1);
      } else if (this.currentPage <= 4) {
        return [1, 2, 3, 4, 5];
      } else  if (this.currentPage > this.pagesCount - 4) {
        return [...Array(5).keys()].reverse().map(v => this.pagesCount - v);
      } else {
        return [this.currentPage - 1, this.currentPage, this.currentPage + 1]
      }
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
