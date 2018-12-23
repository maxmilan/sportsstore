<template>
  <div class="row my-2">
    <label class="col-2 col-from-label text-right">
      Search:
    </label>
    <input v-model="text" @keyup.enter="doSearch" type="text" class="col form-control" placeholder="Enter text ..."/>
    <button @click="doSearch" class="col-1 btn btn-sm btn-secondary mx-4">
      Search
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      text: this.searchString
    }
  },
  computed: {
    ...mapState(['searchString'])
  },
  methods: {
    ...mapActions(['submitSearch']),
    doSearch() {
      this.submitSearch(this.text);
    }
  }
}
</script>
