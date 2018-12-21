<template>
  <div v-if="show" class="text-danger">
    <div v-for="m in messages" :key="m">
      {{ m }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['validation'],
  computed: {
    show() {
      return this.validation.$dirty && this.validation.$invalid;
    },
    messages() {
      let messages = [];
      if (this.hasValidationError("required")) {
        messages.push('Please enter a value');
      } else if (this.hasValidationError("email")) {
        messages.push('Email is invalid');
      }
      return messages;
    }
  },
  methods: {
    hasValidationError(type) {
      return this.validation.$params.hasOwnProperty(type) && !this.validation[type];
    }
  }
}
</script>

