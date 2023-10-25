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
          class="basket relative purchase-btn uppercase"
          square
          variant="tertiary"
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
      required: true,
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
  height: 30px;
  display: flex;
  padding-right: 30px;
  justify-content: space-between;
  flex-direction: column;
}
.purchase-btn {
  align-self: center;
  width: 80%;
  height: 30px;
  font-size: 12px;
  background: #ff6600;
  border: none;
  padding-bottom: 5px;
}
.basket-icon-small {
  width: 15px;
  height: 15px;
  padding-right: 10px;
}
.uppercase {
  text-transform: uppercase;
}
</style>
