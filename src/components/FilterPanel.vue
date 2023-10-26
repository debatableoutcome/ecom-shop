<template>
  <aside class="aside">
    <h2>Фильтры</h2>

    <h4>Цена</h4>
    <PriceFilter v-model="priceFilter" />

    <h4>Категории</h4>
    <CategoryFilter v-model="categoryFilter" />

    <SfButton type="submit" class="btn" @click="applyFilters"
      >Применить</SfButton
    >
    <SfButton class="btn" @click="resetFilters">Сбросить</SfButton>
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
  methods: {
    ...mapActions(["applyPriceFilter", "applyCategoryFilter", "resetFilters"]),
    applyFilters() {
      this.applyPriceFilter(this.priceFilter);
      this.applyCategoryFilter(this.categoryFilter);
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
