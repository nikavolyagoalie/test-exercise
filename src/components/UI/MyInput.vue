<template>
  <input
    type="text"
    :value="value"
    @input="onInput($event.target.value)"
    ref="input"
  />
</template>

<script>
export default {
  props: ['value'],
  methods: {
    onInput(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style scoped>
</style>