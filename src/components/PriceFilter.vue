<template>
  <form @submit.prevent="handleFilter">
    <div class="price-fields">
      <div class="price-fields-left">
        <label>От</label>
        <input
          v-model="minPrice"
          type="text"
          class="input-field"
          placeholder="0"
          @input="removeLeadingZeros('minPrice')"
        />
      </div>
      <div class="price-fields-right">
        <label>До</label>
        <input
          label="До"
          v-model="maxPrice"
          type="text"
          :placeholder="10000"
          class="input-field"
          @input="removeLeadingZeros('maxPrice')"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      minPrice: null,
      maxPrice: null,
    };
  },
  methods: {
    validatePrice(price) {
      const regex = /^(?!0\d)(\d{1,7}(\.\d{1,2})?)?$/;
      return regex.test(price);
    },
    removeLeadingZeros(field) {
      if (this[field] !== "" && parseFloat(this[field]) > 0) {
        this[field] = parseFloat(this[field]);
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
    },

    computed: {
      filteredProducts() {
        return this.products.filter((product) => {
          return (
            product.price >= this.minPrice && product.price <= this.maxPrice
          );
        });
      },
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
