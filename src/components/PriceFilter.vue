<template>
  <form @submit.prevent="handleFilter">
    <div class="price-fields">
      <div class="price-fields-left">
        <label>От</label>
        <input
          :value="isNaN(priceFilter.minPrice) ? '' : priceFilter.minPrice"
          @blur="updatePrice('min', $event.target.value)"
          type="number"
          class="input-field"
          placeholder="0"
        />
      </div>
      <div class="price-fields-right">
        <label>До</label>
        <input
          :value="isNaN(priceFilter.maxPrice) ? '' : priceFilter.maxPrice"
          @blur="updatePrice('max', $event.target.value)"
          type="number"
          class="input-field"
          placeholder="10000"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["priceFilter"]),
  },
  methods: {
    ...mapMutations(["updatePriceFilter"]),
    updatePrice(type, value) {
      let price = parseFloat(value);
      let adjustedPrice = isNaN(price) ? null : price;

      if (isNaN(price)) {
        alert("Введите корректное значение");
        return;
      }

      let minPrice = this.priceFilter.minPrice;
      let maxPrice = this.priceFilter.maxPrice;

      if (type === "min") {
        minPrice = adjustedPrice;
      } else {
        maxPrice = adjustedPrice;
      }

      if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
        [minPrice, maxPrice] = [maxPrice, minPrice];
      }

      this.updatePriceFilter({
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    },
  },
};
</script>

<style>
form {
  width: 100%;
}
.input-field {
  color: #000000;
  width: 50%;
  margin-top: 15px;
}
.price-fields {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price-fields-left,
.price-fields-right {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
</style>
