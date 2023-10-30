<template>
  <div class="product-card">
    <div class="placeholder-div" v-if="showPlaceholder">
      <div class="no-image">Нет изображения</div>
    </div>
    <img
      :src="`https://picsum.photos/300/100?random=${product.id}`"
      alt="Product Image"
      class="product-card__image"
      @load="handleImageLoad"
      @error="handleImageError"
      v-show="!showPlaceholder"
    />

    <div class="product-card__content">
      <h2 class="product-card__title">{{ product.name }}</h2>
      <p class="product-card__description" @click="toggleDescription">
        {{ descriptionToShow }}
      </p>
      <div class="purchase-container">
        <SfButton
          class="basket relative uppercase basket-button"
          square
          variant="tertiary"
          @click="addToCart"
        >
          <SfIconShoppingCart class="basket-icon-small" />

          <strong>В корзину</strong></SfButton
        >
        <div class="product-card__price">{{ formatPrice(product.price) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
export default {
  components: {
    SfButton,
    SfIconShoppingCart,
  },
  props: {
    product: {
      type: Object,
      default: () => ({ minPrice: null, maxPrice: null }),
    },
  },
  data() {
    return {
      showFullDescription: false,
      showPlaceholder: true,
    };
  },
  computed: {
    descriptionToShow() {
      return this.showFullDescription
        ? this.product.description
        : this.shortDescription;
    },
    shortDescription() {
      return this.product.description.length > 120
        ? this.product.description.substring(0, 117) + "..."
        : this.product.description;
    },
  },
  methods: {
    handleImageLoad() {
      this.showPlaceholder = false;
    },
    handleImageError() {
      this.showPlaceholder = true;
    },
    toggleDescription() {
      this.showFullDescription = !this.showFullDescription;
    },
    formatPrice(price) {
      return parseFloat(price).toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    addToCart() {
      this.$store.commit("incrementCart");
    },
  },
};
</script>

<style scoped>
.product-card {
  height: 280px;
  border: 1px solid black;
  background-color: white;
}

.product-card__image {
  height: 40%;
  display: block;
}
.placeholder-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: #ccc;
  text-align: center;
  line-height: 200px;
  color: #000;
  font-size: 16px;
  overflow: hidden;
  /* border: 1px solid #000;  */
}
.product-card__content {
  padding: 7px;
  text-align: left;
}

.product-card__title {
  font-size: 14px;
  text-align: left;
}

.product-card__description {
  height: 40px;
  cursor: pointer;
  font-size: 12px;
  color: #52103a;
  margin-bottom: 10px;
}

.product-card__price {
  font-size: 14px;
  font-weight: bold;
  align-self: self-end;
}
.purchase-container {
  margin-top: 40px;
  height: 30px;
  display: flex;
  padding: 5px;
  justify-content: space-between;
}
.basket-button {
  align-self: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: 30px;
  font-size: 10px;
  background: #c435a5;
  color: white;
  border: none;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.769);
}
.basket-button:hover {
  background: rgb(239, 9, 47);
  color: white;
}
.basket-button:active {
  color: black;
}
.basket-icon-small {
  width: 30px;

  padding-right: 10px;
}
.uppercase {
  text-transform: uppercase;
}
</style>
