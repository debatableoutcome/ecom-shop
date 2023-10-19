<template>
  <div class="radio-container">
    <fieldset role="radiogroup">
      <legend class="mb-2 text-sm font-normal text-gray-500">Категории</legend>
      <div class="flex flex-col">
        <label
          v-for="{ name, id, value } in details"
          :key="`${value}-${id}`"
          class="flex items-center mb-4 rounded cursor-pointer"
        >
          <SfRadio v-model="radioGroupModelValue" :value="value" :name="name" />
          <span class="ml-2 text-base font-normal leading-6 font-body">{{
            name
          }}</span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { SfRadio } from "@storefront-ui/vue";

export default {
  components: {
    SfRadio,
  },
  data() {
    return {
      radioGroupModelValue: "",
      details: [
        { id: "cat1", name: "Категория 1", value: "Category 1" },
        { id: "cat2", name: "Категория 2", value: "Category 2" },
        { id: "cat3", name: "Категория 3", value: "Category 3" },
        { id: "cat4", name: "Категория 4", value: "Category 4" },
        { id: "cat5", name: "Категория 5", value: "Category 5" },
        { id: "cat6", name: "Категория 6", value: "Category 6" },
      ],
    };
  },
};
</script>

<style scoped>
.radio-container {
  width: 150px;
}
</style>
