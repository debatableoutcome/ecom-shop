<template>
  <form @submit.prevent="handleFilter">
    <div class="price-fields">
      <div class="price-fields-left">
        <label>От</label>
        <input
          :value="minPrice"
          @input="updatePrice('minPrice', $event.target.value)"
          type="text"
          class="input-field"
          placeholder="0"
        />
      </div>
      <div class="price-fields-right">
        <label>До</label>
        <input
          :value="maxPrice"
          @input="updatePrice('maxPrice', $event.target.value)"
          type="text"
          :placeholder="10000"
          class="input-field"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      minPrice: null,
      maxPrice: null,
    };
  },
  mounted() {
    const { minPrice, maxPrice } = this.$store.state.priceFilter;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  },
  methods: {
    ...mapMutations(["setPriceFilter"]),
    validatePrice(price) {
      const regex = /^(?!0\d)(\d{1,7}(\.\d{1,2})?)?$/;
      return regex.test(price);
    },
    updatePrice(field, value) {
      if (this.validatePrice(value)) {
        const cleanValue = value === "" ? null : parseFloat(value);
        this[field] = cleanValue;
        console.log(`${field} обновлено:`, this[field]);
        console.log("Отправляем в мутацию:", {
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        });
        this.setPriceFilter({
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        });
      }
    },
    handleFilter() {
      if (
        !this.validatePrice(this.minPrice) ||
        !this.validatePrice(this.maxPrice) ||
        Number(this.minPrice) > Number(this.maxPrice)
      ) {
        alert('Неверный формат цены или условие "От" > "До" не выполняется');
        return;
      }
      console.log("Фильтр применен:", {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
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
  color: black;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
</style>
