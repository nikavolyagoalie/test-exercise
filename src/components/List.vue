<template>
  <div class="product-list">
    <!-- добавляю :key поскольку этот атрибут "...помогает алгоритму работы с виртуальным DOM определить, какие ноды соответствует какой строке данных."(Текст из документации)   -->
    <div
      class="card"
      v-for="(product, idx) in products"
      :style="{ width: cardsWidth + '%' }"
      :class="{ fullScreen: isFull }"
      :key="idx"
    >
      <p class="card-title">{{ product.title }}</p>
      <img class="card-image" :src="product.image" alt="" />
      <!-- цену округляю до двух знаков после запятой -->
      <p class="card-price">
        Цена: {{ parseFloat(product.price.toFixed(2)) }} {{ currency }}
      </p>

      <!-- добавил класс для блоков input -->
      <div class="card-input">
        <input type="number" ref="amount" :id="product.id" />
        <span>кг</span>
      </div>

      <button @click="addToCart(product)">В корзину</button>
    </div>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    MyInput,
  },
  props: {
    currency: String,
  },
  data() {
    return {
      products: [],
      //добавляю свойство для отслеживания ширины экрана
      cardsWidth: 0,
      isFull: false,
    };
  },
  //использую метод updateWidth() для обновления ширины карточки продукта
  methods: {
    updateWidth() {
      let width = window.innerWidth;
      let count = 1;
      //значение width в числовой формат из строчного
      if (width > 840) {
        this.isFull = true;
        count = 3.1;
      } else if (width > 420 && width < 840) {
        this.isFull = true;
        count = 2.05;
      }
      this.cardsWidth = 100 / count;
    },

    //чтобы исправить данный кусок кода в котором setInterval нужно было поставить на 2000мс обратился с вопросом на канал по Vue в телеграме, где наводку дал сам автор тестового))) как тесен мир) вот это был поворот)
    startPricesMonitoring() {
      setInterval(this.getList, 2000);
    },

    async getList() {
      let data = await this.$store.dispatch("getProductsList");
      this.products = data;
    },

    addToCart(product) {
      let currentInput = this.$refs.amount.find((input) => {
        return input.id === product.id;
      });

      let amount = currentInput.value;

      let data = {
        amount,
        price: product.price,
        title: product.title,
      };

      //если значение поля ввода больше 0, то добавляем товары в корзину,очищаем поле ввода
      if (amount > 0) {
        this.$parent.cart.push(data);
        currentInput.value = "";
      }
    },
  },
  
  created() {
    //При создании экземпляра компонента подписываюсь на изменения размеров экрана
    window.addEventListener("resize", this.updateWidth);
    this.startPricesMonitoring();
    //а также вызываю функцию updateWidth()
    this.updateWidth();
  },
};
</script>

<!-- добавляю scoped и адаптивные стили -->
<style scoped>
.product-list {
  /* изменил внутренние отступы и изменил стили под фиксированный header*/
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  top: 45px;
  margin-bottom: 60px;
}

.card {
  display: inline-block;
  width: 100%;
  border: 1px solid #908888;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  margin-right: 14px;
  margin-bottom: 14px;
}
.fullScreen {
  margin-right: 0;
}
.card-image {
  width: 100%;
  /* добавил внешний отступ для изображения */
  margin: 14px 0;
  /* добавил радиус для блока с изображением */
  border-radius: 5px;
}
.card-input {
  /* добавил внешний отступ для блоков с input */
  margin: 14px 0;
}
.card-input input {
  /* добавил доп.стилизацию для input */
  margin-right: 10px;
  border: 1px solid teal;
  padding: 5px 10px;
  border-radius: 5px;
}
button {
  /* добавил дополнительную стилизацию для button */
  padding: 10px 15px;
  background: none;
  color: #2f3e4e;
  border: 1px solid #2f3e4e;
  cursor: pointer;
  border-radius: 5px;
}

/* добавил hover-эффект для button */
button:hover {
  background: #e1e1e1;
  transition: 0.3s all;
}

@media screen and (max-width: 420px) {
  .product-list {
    top: 70px;
  }
}
</style>
