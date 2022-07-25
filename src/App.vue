<template>
  <div id="app">
    <Header :cart="cart" :currency="currency"></Header>
    <!-- Создаю блок c классом main для размещения в нем компонентов списка продуктов и компонента списка продуктов в корзине. Ниже добавлены стили, позволяющие на больших разрешениях размещать список продуктов и список продуктов в корзине на одном уровне -->
    <div class="main">
      <List :currency="currency"/>
      <Cart :cart="cart"/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import List from './components/List.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'App',
  data() {
    return {
      cart: [],
      currency: 'VGTB',
    };
  },
  components: {
    Header,
    List,
    Cart,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .main {
    flex-direction: column;
  }
}
</style>
