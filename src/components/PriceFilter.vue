<template>
  <form @submit.prevent="handleFilter">
    <div class="price-fields">
      <div class="price-fields-left">
        <label>От</label>
        <input
          :value="isNaN(priceFilter.minPrice) ? '' : priceFilter.minPrice"
          @input="updatePrice('min', $event.target.value)"
          type="number"
          class="input-field"
          placeholder="0"
        />
      </div>
      <div class="price-fields-right">
        <label>До</label>
        <input
          :value="isNaN(priceFilter.maxPrice) ? '' : priceFilter.maxPrice"
          @input="updatePrice('max', $event.target.value)"
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
      const price = parseFloat(value);
      const adjustedPrice = isNaN(price) ? null : price;

      if (type === "min") {
        this.updatePriceFilter({
          minPrice: adjustedPrice,
          maxPrice: this.priceFilter.maxPrice,
        });
      } else {
        this.updatePriceFilter({
          minPrice: this.priceFilter.minPrice,
          maxPrice: adjustedPrice,
        });
      }
    },
    handleFilter() {
      if (
        !this.validatePrice(this.priceFilter.minPrice) ||
        !this.validatePrice(this.priceFilter.maxPrice) ||
        (this.priceFilter.minPrice !== null &&
          this.priceFilter.maxPrice !== null &&
          this.priceFilter.minPrice > this.priceFilter.maxPrice)
      ) {
        alert('Неверный формат цены или условие "От" > "До" не выполняется');
        return;
      }
    },
    validatePrice(price) {
      const regex = /^(?!0\d)(\d{1,7}(\.\d{1,2})?)?$/;
      return regex.test(String(price));
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
