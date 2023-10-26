<template>
  <div class="radio-container">
    <fieldset role="radiogroup">
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
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["categoryFilter"]),
  },

  data() {
    return {
      radioGroupModelValue: this.categoryFilter || "",
      details: [
        {
          id: "dicta",
          name: "Категория 1",
          value: "dicta",
        },
        {
          id: "vel",
          name: "Категория 2",
          value: "vel",
        },
        {
          id: "omnis",
          name: "Категория 3",
          value: "omnis",
        },
        {
          id: "quos",
          name: "Категория 4",
          value: "quos",
        },
        {
          id: "eos",
          name: "Категория 5",
          value: "eos",
        },
        {
          id: "magni",
          name: "Категория 6",
          value: "magni",
        },
      ],
    };
  },
  watch: {
    categoryFilter(newVal) {
      if (newVal === null || newVal === "") {
        this.radioGroupModelValue = "";
      }
    },

    radioGroupModelValue(newVal) {
      this.applyCategoryFilter(newVal);
    },
  },

  methods: {
    ...mapActions(["applyCategoryFilter", "resetFilters"]),
  },
  components: {
    SfRadio,
  },
};
</script>

<style scoped>
.radio-container {
  width: 110px;
}
</style>
