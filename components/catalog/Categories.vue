<template>
  <ul
    class="flex flex-wrap font-medium text-center border-b border-opacity-40 border-primary bg-white rounded-t-xl uppercase text-xs"
  >
    <li class="mr-2">
      <button
        :class="{ active: activeCategory === '' }"
        @click="selectCategory('')"
        class="inline-block p-4 rounded-t-lg text-primary text-opacity-50 uppercase"
      >
        Todos
      </button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
        :class="{ active: activeCategory === category.name }"
        class="inline-block p-4 rounded-t-lg text-primary text-opacity-50"
      >
        {{ category.name }}
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      activeCategory: "",
    };
  },
  computed: {
    ...mapState(["categories"]),
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions(["fetchCategories", "filterProducts"]),
    selectCategory(category) {
      this.activeCategory = category.name;
      if (category === "") {
        return this.$store.dispatch("fetchProducts", category.name);
      } else {
        return this.$store.dispatch(
          "filterProducts",
          category.name.toUpperCase()
        );
      }
    },
  },
};
</script>

<style scoped>
.active {
  @apply bg-gray-100 text-opacity-100;
}
</style>
