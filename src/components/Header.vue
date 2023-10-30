<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Ecom Logo" class="logo" />
    </div>
    <SfButton class="basket relative" square variant="tertiary">
      <SfIconShoppingCart class="icon-basket" />
      <SfBadge
        :content="$store.getters.getCartCount"
        :max="99"
        class="badge"
        placement="top-right"
        v-if="$store.getters.getCartCount > 0"
      >
      </SfBadge>
    </SfButton>
  </div>
</template>

<script>
import { SfBadge, SfButton, SfIconShoppingCart } from "@storefront-ui/vue";
export default {
  name: "header-component",
  components: {
    SfBadge,
    SfIconShoppingCart,
    SfButton,
  },
  props: ["cartCount"],
  mounted() {
    console.log("cartCount в header:", this.cartCount);
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgb(102, 0, 153);
  background: linear-gradient(
    90deg,
    rgba(102, 0, 153, 1) 12%,
    rgba(89, 10, 179, 1) 50%,
    rgba(135, 58, 218, 1) 100%
  );
}

.logo img {
  max-width: 60px;
  margin-left: 30px;
}

.basket {
  cursor: pointer;
  width: 70px;
  display: flex;
  align-items: center;
  margin-right: 50px;
  transition: all 0.3s;

  background: transparent;
  border: none;
  border-radius: 50% !important;
}
.badge {
  color: black;
  font-weight: 700;
  width: 25px;
  background-color: rgb(239, 11, 65);
  border-radius: 50%;
  margin-bottom: 20px;
}

.icon-basket {
  width: 40px;
  padding-right: 3px;
}
</style>
