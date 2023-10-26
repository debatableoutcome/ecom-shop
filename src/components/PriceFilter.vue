<template>
  <form @submit.prevent="handleFilter">
    <div class="price-fields">
      <div class="price-fields-left">
        <label>От</label>
        <input
          :value="priceFilter.minPrice"
          @input="updatePrice('min', $event.target.value)"
          type="text"
          class="input-field"
          placeholder="0"
        />
      </div>
      <div class="price-fields-right">
        <label>До</label>
        <input
          :value="priceFilter.maxPrice"
          @input="updatePrice('max', $event.target.value)"
          type="text"
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
      const price = parseFloat(value) || null;
      if (type === "min") {
        this.updatePriceFilter({
          minPrice: price,
          maxPrice: this.priceFilter.maxPrice,
        });
      } else {
        this.updatePriceFilter({
          minPrice: this.priceFilter.minPrice,
          maxPrice: price,
        });
      }
    },
    handleFilter() {
      if (
        !this.validatePrice(this.localMinPrice) ||
        !this.validatePrice(this.localMaxPrice) ||
        Number(this.localMinPrice) > Number(this.localMaxPrice)
      ) {
        alert('Неверный формат цены или условие "От" > "До" не выполняется');
        return;
      }
      this.updatePriceFilter({
        minPrice: this.localMinPrice,
        maxPrice: this.localMaxPrice,
      });
    },

    validatePrice(price) {
      const regex = /^(?!0\d)(\d{1,7}(\.\d{1,2})?)?$/;
      return regex.test(price);
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
