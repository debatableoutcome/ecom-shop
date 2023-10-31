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
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["categoryFilter"]),
  },

  data() {
    return {
      radioGroupModelValue: this.categoryFilter || "",
      details: [
        {
          id: "3aaae99f-60b7-3718-a86b-bbeccbe54902",
          name: "Категория 1",
          value: "3aaae99f-60b7-3718-a86b-bbeccbe54902",
        },
        {
          id: "044d079e-169a-37c1-a3ff-f0810660733e",
          name: "Категория 2",
          value: "044d079e-169a-37c1-a3ff-f0810660733e",
        },
        {
          id: "b1ae871c-b0f5-3971-b7fa-1c6b8d309ca3",
          name: "Категория 3",
          value: "b1ae871c-b0f5-3971-b7fa-1c6b8d309ca3",
        },
        {
          id: "91ac821c-c246-32cc-844f-75f0f105a962",
          name: "Категория 4",
          value: "91ac821c-c246-32cc-844f-75f0f105a962",
        },
        {
          id: "f7c1cdd1-33c7-308b-9131-12269b98d38e",
          name: "Категория 5",
          value: "f7c1cdd1-33c7-308b-9131-12269b98d38e",
        },
        {
          id: "05634c96-a559-3035-ba82-91f29fa7bb34",
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
      this.updateCategoryFilter(newVal);
    },
  },

  methods: {
    ...mapMutations(["updateCategoryFilter"]),
    ...mapActions(["resetFilters"]),
  },
  resetFilter() {
    this.resetFilters();
    this.radioGroupModelValue = "";
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
