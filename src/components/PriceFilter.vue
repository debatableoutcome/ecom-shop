<template>
  <form @submit.prevent="handleFilter">
    <div class="price-fields">
      <div class="price-fields-left">
        <label>От</label>
        <SfInput
          v-model="minPrice"
          type="number"
          class="input-field"
          placeholder="0"
        />
      </div>
      <div class="price-fields-right">
        <label>До</label>
        <SfInput
          label="До"
          v-model="maxPrice"
          type="number"
          :placeholder="10000"
          class="input-field"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { SfInput } from "@storefront-ui/vue";

export default {
  data() {
    return {
      minPrice: null,
      maxPrice: null,
    };
  },
  components: {
    SfInput,
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return product.price >= this.minPrice && product.price <= this.maxPrice;
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
  color: white;
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
