<template>
  <div class="pb-8">
    <div class="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <section
        class="banner-cyber w-full min-h-[400px] relative flex items-center justify-between px-2 md:px-8 overflow-hidden">
        <!-- Fondo (la imagen ya tiene la forma verde y naranja) -->
        <img :src="bg" alt="Fondo" class="absolute inset-0 w-full h-full object-cover z-0" />

        <!-- Estrellas -->
        <!-- <img :src="estrellas" alt="Estrellas" class="absolute left-0 top-0 w-100 z-10" /> -->

        <!-- Contenido principal -->
        <div class="content-cyber relative z-40 max-w-2xl pl-0 md:pl-16 flex flex-col justify-center"
          style="min-height: 340px;">
          <h1 class="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">DA MELO TODO</h1>

          <span
            class="bg-lime-400 mb-4 px-6 py-2 rounded-lg text-xl md:text-2xl font-bold text-green-900 inline-block whitespace-nowrap">
            ENVÍO GRATIS TODO COLOMBIA
          </span>

          <transition-group name="fade" tag="div">
            <p v-if="currentTextIndex === 0" key="texto1" class="text-white text-lg md:text-xl mb-6">Esta semana
              lanzamos una PROMO ESPECIAL con envío gratis y pago contra entrega en todo Colombia!!</p>
            <p v-if="currentTextIndex === 1" key="texto2" class="text-white text-lg md:text-xl mb-6">¡Aprovecha nuestras
              ofertas exclusivas solo por tiempo limitado!</p>
            <p v-if="currentTextIndex === 2" key="texto3" class="text-white text-lg md:text-xl mb-6">Compra fácil,
              rápido y seguro. ¡No te lo pierdas!</p>
          </transition-group>
          <!-- Dots -->
          <div class="flex gap-2 mt-2 justify-center items-center">
            <img v-for="i in 3" :key="i" :src="currentTextIndex === (i - 1) ? dotSelected : dot"
              class="w-7 h-7 cursor-pointer" @click="setTextIndex(i - 1)" />
          </div>
        </div>

        <!-- Carrito -->
        <img :src="carro" alt="Carrito" class="absolute !right-2 md:!right-36 bottom-0 !w-[150px] md:!w-[420px] max-w-[40vw] !z-50" />

        <!-- Hojas -->
        <img :src="hojas" alt="Hojas" class="absolute !right-[-30px] !bottom-[-50px] w-[300px] max-w-[30vw] !z-10" />
      </section>
    </div>
    <section class="-mt-[3rem] px-2 sm:px-4 md:px-8 relative z-50">
      <Categories @category-selected="onCategorySelected" />
      <Catalog :products="filteredProducts" />
    </section>
  </div>
</template>

<script>
import Categories from "~/components/catalog/Categories.vue";
import Catalog from "~/components/home/Catalog.vue";
import { mapState, mapActions } from 'vuex';
// Importar imágenes correctamente
import bg from '@/assets/images/banner/bg.jpg';
import estrellas from '@/assets/images/banner/Estrellas.svg';
import carro from '@/assets/images/banner/Carro.svg';
import hojas from '@/assets/images/banner/Hojas.svg';
import dot from '@/assets/images/banner/dot.svg';
import dotSelected from '@/assets/images/banner/dotSelected.svg';

export default {
  components: {
    Catalog,
    Categories,
  },
  computed: {
    ...mapState(['filteredProducts']),
  },
  data() {
    return {
      currentTextIndex: 0,
      textInterval: null,
      bg,
      estrellas,
      carro,
      hojas,
      dot,
      dotSelected,
    };
  },
  created() {
    this.fetchProducts();
  },
  mounted() {
    this.startTextSlider();
  },
  beforeDestroy() {
    clearInterval(this.textInterval);
  },
  methods: {
    ...mapActions(['fetchProducts', 'filterProducts']),

    // Método para manejar la selección de la categoría
    onCategorySelected(category) {
      this.filterProducts(category); // Llama a la acción Vuex para filtrar productos
    },
    setTextIndex(i) {
      this.currentTextIndex = i;
      this.restartTextSlider();
    },
    startTextSlider() {
      this.textInterval = setInterval(() => {
        this.currentTextIndex = (this.currentTextIndex + 1) % 3;
      }, 4000);
    },
    restartTextSlider() {
      clearInterval(this.textInterval);
      this.startTextSlider();
    },
  },
};
</script>

<style>
.banner-cyber {
  position: relative;
  min-height: 420px;
  background: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 0;
}

.content-cyber {
  position: relative;
  z-index: 40;
  max-width: 600px;
  width: 600px;
  min-width: 320px;
  margin-left: 0;
  text-align: left;
  padding-top: 2rem;
  padding-bottom: 2rem;
  word-break: break-word;
  white-space: normal;
}

.banner-cyber img[alt="Fondo"] {
  z-index: 0;
}

.banner-cyber img[alt="Estrellas"] {
  z-index: 10;
}

.banner-cyber img[alt="Carrito"] {
  z-index: 20;
  right: 4vw;
  bottom: 0;
  width: 420px;
  max-width: 40vw;
}

.banner-cyber img[alt="Hojas"] {
  z-index: 30;
  right: 0;
  bottom: 0;
  width: 300px;
  max-width: 30vw;
}

@media (max-width: 900px) {
  .banner-cyber {
    flex-direction: column;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    min-height: 350px;
  }

  .content-cyber {
    width: 100%;
    max-width: 95vw;
    min-width: 0;
    text-align: center;
    margin: 0 auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .banner-cyber img[alt="Carrito"] {
    width: 220px;
    max-width: 60vw;
    right: 0;
  }

  .banner-cyber img[alt="Hojas"] {
    width: 120px;
    max-width: 40vw;
  }
}

.btn-cyber {
  background: #f7941d;
  color: #fff;
  padding: 14px 36px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-cyber:hover {
  background: #222;
  color: #fff;
}
</style>
