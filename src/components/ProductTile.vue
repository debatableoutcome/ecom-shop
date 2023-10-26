<template>
  <div class="product-card">
    <img
      :src="`https://picsum.photos/300/100?random=${product.id}`"
      alt="Product Image"
      class="product-card__image"
    />

    <div class="product-card__content">
      <h2 class="product-card__title">{{ product.name }}</h2>
      <p class="product-card__description" @click="toggleDescription">
        {{ descriptionToShow }}
      </p>
      <div class="purchase-container">
        <p class="product-card__price">{{ formatPrice(product.price) }}</p>

        <SfButton
          class="basket relative purchase-btn uppercase basket-button"
          square
          variant="tertiary"
          @click="addToCart"
        >
          <SfIconShoppingCart class="basket-icon-small" />

          <strong>В корзину</strong></SfButton
        >
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
      console.log("++");
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 300px;
  height: 280px;
  border: 1px solid #e1e1e1;
  background-color: white;
}

.product-card__image {
  height: 35%;
  display: block;
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
  color: #777;
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
  padding-right: 30px;
  justify-content: space-between;
  flex-direction: column;
}
.basket-button {
  align-self: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 30px;
  font-size: 12px;
  background: #c435a5;

  border: none;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.769);
}
.basket-button:hover {
  background: rgb(239, 9, 47);
  color: white;
}
.basket-button:active {
  background: rgb(239, 11, 65);
  color: white;
}
.basket-icon-small {
  width: 30px;

  padding-right: 10px;
}
.uppercase {
  text-transform: uppercase;
}
</style>
