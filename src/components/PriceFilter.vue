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
export default {
  props: {
    priceFilter: {
      type: Object,
      default: () => ({ minPrice: null, maxPrice: null }),
    },
  },
  data() {
    return {
      minPrice: this.priceFilter ? this.priceFilter.minPrice : null,
      maxPrice: this.priceFilter ? this.priceFilter.maxPrice : null,
    };
  },
  watch: {
    priceFilter: {
      handler(newVal) {
        this.minPrice = newVal.minPrice;
        this.maxPrice = newVal.maxPrice;
      },
      deep: true,
    },
    minPrice(newVal, oldVal) {
      console.log("minPrice изменен:", newVal, oldVal); // Логирование здесь
      this.$emit("update:priceFilter", {
        minPrice: newVal,
        maxPrice: this.maxPrice,
      });
    },
    maxPrice(newVal, oldVal) {
      console.log("maxPrice изменен:", newVal, oldVal); // Логирование здесь
      this.$emit("update:priceFilter", {
        minPrice: this.minPrice,
        maxPrice: newVal,
      });
    },
  },
  methods: {
    validatePrice(price) {
      const regex = /^(?!0\d)(\d{1,7}(\.\d{1,2})?)?$/;
      return regex.test(price);
    },
    updatePrice(field, value) {
      if (this.validatePrice(value)) {
        const cleanValue = parseFloat(value) > 0 ? parseFloat(value) : 0;
        this[field] = cleanValue;
        console.log(`${field} обновлено:`, this[field]); // Логирование здесь
      }
    },
    handleFilter() {
      if (
        !this.validatePrice(this.minPrice) ||
        !this.validatePrice(this.maxPrice) ||
        parseFloat(this.minPrice) > parseFloat(this.maxPrice)
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
