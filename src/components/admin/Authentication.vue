<template>
  <div class="m-2">
    <h4 class="bg-primary text-white text-center p-2">
      SportsStore administration
    </h4>

    <h4 v-if="showFailureMessage" class="bg-danger text-white text-center p-2 my-2">
      Authentication failed. Try again
    </h4>

    <div class="from-group">
      <label>
        Username
      </label>
      <input v-model="$v.username.$model" type="text" class="form-control">
      <validation-error :validation="$v.username" />
    </div>

    <div class="form-group">
      <label>
        Password
      </label>
      <input v-model="$v.password.$model" type="password" class="form-control">
      <validation-error :validation="$v.password" />
    </div>

    <div class="text-center">
      <button @click="handleAuth" class="btn btn-primary">
        Log In
      </button>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import ValidationError from "../ValidationError";

export default {
  components: { ValidationError },
  data: function () {
    return {
      username: '',
      password: '',
      showFailureMessage: false
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  computed: {
    ...mapState({ authenticated: state => state.auth.authenticated })
  },
  methods: {
    ...mapActions(['authenticate']),
    async handleAuth() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.authenticate({ username: this.username, password: this.password });
        if (this.authenticated) {
          this.showFailureMessage = false;
          this.$router.push("/admin");
        } else {
          this.showFailureMessage = true;
        }
      }
    }
  }
}
</script>

