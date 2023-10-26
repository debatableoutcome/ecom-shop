import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// import "@storefront-ui/vue/styles.scss";
// import "tailwindcss/tailwind.css";

import "./assets/styles.css";
// createApp(App).use(store).mount("#app");
const app = createApp(App);

app.use(store);

app.mount("#app");
