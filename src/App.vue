<template>
  <main>
    <Header />
    <div class="lower-container">
      <FilterPanel />
      <ProductScreen />
    </div>
  </main>
</template>

<script>
import Header from "./components/Header.vue";
import FilterPanel from "./components/FilterPanel.vue";
import ProductScreen from "./components/ProductScreen.vue";

export default {
  name: "App",
  components: {
    Header,
    FilterPanel,
    ProductScreen,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: green;
}
.lower-container {
  background: hotpink;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
</style>
