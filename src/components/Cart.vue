<template>
  <div class="cart-list" v-if="cart.length > 0">
    <!-- список товаров в корзине выполнил при помощи таблицы -->
    <table class="table">
      <thead>
        <tr>
          <th>Название товара</th>
          <th>Общая сумма, VGTB</th>
          <th>Общий вес, кг</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in cartList" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.totalPrice }}</td>
          <td>{{ item.totalAmount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: ["Морковка", "Картошка", "Капуста"],
      showTable: false,
    };
  },
  props: {
    cart: Array,
  },
  computed: {
    cartList() {
      let obj = {};
      let arr = this.cart.reverse();
      let totalPrice = 0;
      let totalAmount = 0;
      let name = "";

      for (let i = 0; i < arr.length; i++) {
        if (obj[arr[i].title] === undefined) {
          totalPrice = +arr[i].amount * +arr[i].price;
          totalAmount = +arr[i].amount;
          name = arr[i].title;

          obj[arr[i].title] = {
            totalPrice,
            totalAmount,
            name,
          };
        } else {
          if (Object.keys(obj).includes(arr[i].title)) {
            obj[arr[i].title].totalPrice += +arr[i].amount * +arr[i].price;
            obj[arr[i].title].totalAmount += +arr[i].amount;
          }
        }
      }

      return obj;
    },
  },
};
</script>

<style scoped>
.cart-list {
  padding: 10px;
  position: relative;
  top: 45px;
  min-width: 385px;
}
.table {
  border-collapse: collapse;
}

.table th {
  border-bottom: 2px solid #908888;
  padding: 10px;
}

.table td {
  padding: 10px;
}

@media screen and (max-width: 1024px) {
  .cart-list {
    top: 0;
  }
}

@media screen and (max-width: 420px) {
  .cart-list {
    min-width: auto;
  }
}
</style>
