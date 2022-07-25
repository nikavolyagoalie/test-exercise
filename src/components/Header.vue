<!-- переместил template снизу вверх -->
<template>
  <div class="header">
    <!--  -->
    <h3 class="header-text">
      Товаров в корзине на:
      <span class="total">{{ cartPrice }} {{ currency }}</span>
    </h3>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    cart: Array,
    required: true,
    default: {},

    currency: String,
  },
  data() {
    return {
      cartPrice: 0,
    };
  },
  watch: {
    cart(cart) {
      let val = 0;
      cart.forEach((item) => {
        val += item.price * item.amount;
      });
      this.cartPrice = val;
    },
  },
};
</script>

<style scoped>
.header {
  padding: 10px;
  background: #e5e5e5;
  /* фиксирую шапку */
  position: fixed;
  width: 100%;
  z-index: 1;
}

@media screen and (max-width: 420px) {

  .header-text {
    display: flex;
    flex-direction: column;
  }
}
</style>
