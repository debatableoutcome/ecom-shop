<template>
  <aside class="aside">
    <h2>Фильтры</h2>

    <h4>Цена</h4>
    <PriceFilter
      :priceFilter="localPriceFilter"
      @update:priceFilter="localPriceFilter = $event"
    />

    <h4>Категории</h4>
    <CategoryFilter
      :categoryFilter="localCategoryFilter"
      @update:categoryFilter="localCategoryFilter = $event"
    />

    <SfButton type="submit" class="btn" @click="applyFilters"
      >Применить</SfButton
    >
    <SfButton class="btn" @click="resetFilters">Сбросить</SfButton>
  </aside>
</template>

<script>
import { SfButton } from "@storefront-ui/vue";
import PriceFilter from "./PriceFilter.vue";
import CategoryFilter from "./CategoryFilter.vue";

export default {
  name: "FilterPanel",
  components: {
    SfButton,
    PriceFilter,
    CategoryFilter,
  },
  props: {
    priceFilter: Object,
    categoryFilter: String,
  },
  data() {
    return {
      localPriceFilter: this.priceFilter,
      localCategoryFilter: this.categoryFilter,
      filteredProducts: [],
      products: [],
    };
  },
  watch: {
    priceFilter: {
      handler(newVal) {
        this.localPriceFilter = newVal;
      },
      deep: true,
    },
    categoryFilter(newVal) {
      this.localCategoryFilter = newVal;
    },
  },
  methods: {
    applyFilters() {
      console.log(
        "Применяются фильтры:",
        this.localPriceFilter,
        this.localCategoryFilter
      );
      this.$emit("update:priceFilter", this.localPriceFilter);
      this.$emit("update:categoryFilter", this.localCategoryFilter);
    },
    resetFilters() {
      this.localCategoryFilter = null;
      this.localPriceFilter = { minPrice: null, maxPrice: null };
      this.$emit("update:priceFilter", this.localPriceFilter);
      this.$emit("update:categoryFilter", this.localCategoryFilter);
      this.$emit("filtersReset");
    },
  },
};
</script>

<style scoped>
aside {
  color: #ff6600;
  margin-top: 20px;
  min-width: 270px;
  width: 10%;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background: rgb(102, 0, 153);
  background: linear-gradient(
    90deg,
    rgba(102, 0, 153, 1) 12%,
    rgba(89, 10, 179, 1) 50%,
    rgba(135, 58, 218, 1) 100%
  );
}

.btn {
  width: 70%;
  height: 26px;
  background: #ff6600;
  color: #660099;
  font-size: 16px;
  font-weight: 700;
}

.basket {
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 30px;
  transition: all 0.3s;
  border: none;
}
</style>
