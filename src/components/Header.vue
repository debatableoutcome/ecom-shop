<template>
  <div class="header">
    <div class="logo">
      <!-- <SfImage src="@/assets/logo.png" alt="Ecom Logo" class="logo" /> -->
      <img src="@/assets/logo.png" alt="Ecom Logo" class="logo" />
    </div>
    <SfButton class="basket relative" square variant="tertiary">
      <SfIconShoppingCart />
      <SfBadge />
    </SfButton>
  </div>
</template>

<script>
import { SfBadge, SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
export default {
  name: "header-component",
  components: {
    // SfImage,
    SfButton,
    SfBadge,
    SfIconShoppingCart,
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 47px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #660099;
}

.logo img {
  max-width: 60px;
  margin-left: 30px;
}

.basket {
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 30px;
  transition: all 0.3s;
  background: #ff6600;
  border: none;
}
</style>
