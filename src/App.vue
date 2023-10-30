<template>
  <main>
    <Header :cartCount="cartCount" />
    <div class="lower-container">
      <FilterPanel />
      <ProductScreen />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header.vue";

import FilterPanel from "@/components/FilterPanel.vue";
import ProductScreen from "@/components/ProductScreen.vue";

export default {
  components: {
    Header,
    FilterPanel,
    ProductScreen,
  },
  computed: {
    ...mapState(["priceFilter", "categoryFilter"]),
  },
};
</script>

<style>
#app {
  font-family: "Trebuchet MS", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main {
  background: rgb(55, 26, 119);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.lower-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: self-start;
  /* justify-content: space-between; */
  /* gap: 20px; */
}
</style>
