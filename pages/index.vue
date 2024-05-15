<template>
  <div class="pb-8">
    <section
      class="flex flex-col items-start justify-center px-8 md:px-32 h-48 bg-secondary -mx-10 md:-mx-32 -mt-16 mb-8 banner bg-no-repeat"
    ></section>
    <section class="-mt-20">
      <Categories @category-selected="filterProducts" />
      <div class="text-center pt-10 flex flex-col justify-center items-center">
        <h1 class="text-primary">Get Doggy Stickers!</h1>
        <p class="text-gray-400 leading-6">
          Times are tough. Liven up your home with some cute Doggy Stickers. 🐶
        </p>
      </div>

      <Catalog :products="filteredProducts" />
    </section>
  </div>
</template>

<script>
import Categories from "~/components/catalog/Categories.vue";
import Catalog from "~/components/home/Catalog.vue";
import { db } from "@/plugins/firebase";
export default {
  components: {
    Catalog,
    Categories,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
    };
  },
  created() {
    // Carga todos los productos al inicio
    const response = db.collection("products").get();
    response
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const product = {
            id: doc.id,
            ...doc.data(),
          };
          this.products.push(product);
        });
        // Al cargar los productos, también los filtramos inicialmente mostrando todos
        this.filteredProducts = this.products;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    filterProducts(category) {
      if (category === "") {
        // Si se selecciona la categoría 'Todos', mostramos todos los productos
        this.filteredProducts = this.products;
      } else {
        // Filtramos los productos según la categoría seleccionada
        this.filteredProducts = this.products.filter((product) =>
          product.category.includes(category)
        );
      }
    },
  },
};
</script>

<style>
.banner {
  background: url("https://firebasestorage.googleapis.com/v0/b/emprendimiento-01.appspot.com/o/banner-optimized.webp?alt=media&token=9801e769-8d77-4ebb-8912-76b065ad2ab9");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
