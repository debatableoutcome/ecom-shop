<template>
  <aside class="aside">
    <h2>Фильтры</h2>

    <h4>Цена</h4>
    <PriceFilter v-model="localPriceFilter" />

    <h4>Категории</h4>
    <CategoryFilter v-model="localCategoryFilter" />

    <SfButton type="submit" class="btn" @click="applyFilters"
      >Применить</SfButton
    >

    <SfButton class="btn" @click="resetLocalFilters">Сбросить</SfButton>
  </aside>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  computed: {
    ...mapState(["cartCount", "priceFilter", "categoryFilter"]),
  },
  data() {
    return {
      localPriceFilter: this.priceFilter,
      localCategoryFilter: this.categoryFilter,
    };
    // return {
    //   localPriceFilter: { ...this.priceFilter }, // копия объекта
    //   localCategoryFilter: this.categoryFilter,
    // };
  },
  watch: {
    priceFilter: {
      handler(newValue) {
        this.localPriceFilter = newValue;
      },
      immediate: true,
    },
    categoryFilter: {
      handler(newValue) {
        this.localCategoryFilter = newValue;
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(["applyPriceFilter", "applyCategoryFilter"]),
    applyFilters() {
      this.applyPriceFilter(this.localPriceFilter);
      this.applyCategoryFilter(this.localCategoryFilter);
    },

    //   console.log(
    //     "Применяются фильтры:",
    //     "Global Price Filter:",
    //     this.priceFilter,
    //     "Global Category Filter:",
    //     this.categoryFilter
    //   );
    // },
    handlePriceChange(min, max) {
      this.applyPriceFilter({ minPrice: min, maxPrice: max });
    },
    handleCategoryChange(category) {
      this.applyCategoryFilter(category);
    },
    // resetLocalFilters() {
    //   this.resetFilters();
    // },
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
