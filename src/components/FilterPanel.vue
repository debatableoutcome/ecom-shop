<template>
  <aside class="aside">
    <h2>Фильтры</h2>

    <h4>Цена</h4>
    <PriceFilter />
    <CategoryFilter />

    <SfButton type="submit" class="btn">Применить</SfButton>
    <SfButton class="btn">Сбросить</SfButton>
  </aside>
</template>

<script>
import { SfButton } from "@storefront-ui/vue";
import PriceFilter from "./PriceFilter.vue";
import CategoryFilter from "./CategoryFilter.vue";

export default {
  name: "filter-component",
  components: {
    SfButton,
    PriceFilter,
    CategoryFilter,
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
