<template>
  <div class="pb-8">
    <section class="flex flex-col items-start justify-center px-8 md:px-32 h-80 bg-secondary -mx-10 md:-mx-32 -mt-16 mb-8 banner bg-no-repeat"></section>
    <section class="-mt-20">
      <Categories @category-selected="onCategorySelected" />
      <!-- <div class="text-center pt-10 flex flex-col justify-center items-center">
        <h1 class="text-primary mb-2">Ve a tu ritmo.</h1>
        <p class="text-gray-400 leading-6">Normalizando lo imperfecto. 🥰</p>
      </div> -->
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
  background: url("https://firebasestorage.googleapis.com/v0/b/emprendimiento-03-52bab.firebasestorage.app/o/MeloTodoBanner.jpg?alt=media&token=8ba7cf27-02a4-4cf1-8dcd-9fb1399927eb");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
