<template>
  <form class="aside" @submit.prevent="applyFilters">
    <h2><strong>Фильтры</strong></h2>

    <h3>Цена</h3>
    <PriceFilter v-model="priceFilter" />

    <h3>Категории</h3>
    <CategoryFilter v-model="categoryFilter" />

    <SfButton type="submit" class="btn" @click="applyFilters"
      ><strong>Применить</strong></SfButton
    >
    <SfButton class="btn" @click="resetAllFilters"
      ><strong>Сбросить</strong></SfButton
    >
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { SfButton } from "@storefront-ui/vue";
import PriceFilter from "@/components/PriceFilter.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";

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
      this.$store.dispatch("fetchProducts");
    },
    resetAllFilters() {
      this.resetFilters();
    },
  },
};
</script>

<style scoped>
.aside {
  position: fixed;
  top: 120px;
  color: rgb(239, 11, 65);
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
  background: #ffffff;
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
h3 {
  color: white;
}
</style>
