<template>
  <div class="pb-8">
    <section class="flex flex-col items-start justify-center px-8 md:px-32 h-48 bg-secondary -mx-10 md:-mx-32 -mt-16 mb-8 banner bg-no-repeat"></section>
    <section class="-mt-20">
      <Categories @category-selected="onCategorySelected" />
      <div class="text-center pt-10 flex flex-col justify-center items-center">
        <h1 class="text-primary mb-2">Ve a tu ritmo.</h1>
        <p class="text-gray-400 leading-6">Normalizando lo imperfecto. 🥰</p>
      </div>
      <Catalog :products="filteredProducts" />
    </section>
  </div>
</template>

<script>
import Categories from "~/components/catalog/Categories.vue";
import Catalog from "~/components/home/Catalog.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Catalog,
    Categories,
  },
  computed: {
    ...mapState(['filteredProducts']),
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchProducts', 'filterProducts']),
    
    // Método para manejar la selección de la categoría
    onCategorySelected(category) {
      this.filterProducts(category); // Llama a la acción Vuex para filtrar productos
    },
  },
};
</script>

<style>
.banner {
  background: url("https://firebasestorage.googleapis.com/v0/b/emprendimiento-02-b9df4.appspot.com/o/BannerCircu.jpg?alt=media&token=d99eb52a-257e-4857-b3d1-aebff7e311a1");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
