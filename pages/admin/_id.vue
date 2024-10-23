<template>
  <div class="flex flex-col lg:flex-row space-x-5" v-if="product">
    <div class="w-2/2 lg:w-1/2">
      <img :src="product.image" />
    </div>

    <form class="w-2/2 lg:w-1/2">
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          v-model="product.name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_repeat_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Name</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          v-model="product.handle"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Handle</label
        >
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model="product.category"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer uppercase"
            placeholder=" "
            required
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Category</label
          >
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model="product.price"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Precio</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="file"
            @change="onFileChange"
            v-on="product.image"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_company"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Image</label
          >
        </div>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <textarea
          type="text"
          v-model="product.description"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_repeat_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Text</label
        >
      </div>
      <button
        type="submit"
        @click.prevent="onUpdate"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
      {{ isLoading ? 'Cargando...' : 'Actualizar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  middleware: "auth",
  layout: "admin",
  data() {
    return {
      product: {
        name: "",
        handle: "",
        category: "",
        price: "",
        description: "",
        image: "",
      },
      isLoading: false,
    };
  },
  mounted() {
    this.loadProduct();
  },
  methods: {
    ...mapActions(['updateProduct', 'uploadImage']),
    
    async loadProduct() {
      try {
        const productHandle = this.$route.params.id;
        const productQuery = await this.$store.dispatch('fetchProductBySlug', productHandle);
        
        if (!this.product) {
          console.error("Producto no encontrado");
          return;
        }

        this.product = this.$store.state.product;
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    },
    
    async onUpdate() {
      try {
        this.isLoading = true;
        await this.updateProduct(this.product); // Llama a la acción del store para actualizar el producto
        alert("Producto actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const imageUrl = await this.uploadImage(file); // Sube la imagen usando la acción del store
          this.product.image = imageUrl;
          console.log("Archivo subido correctamente:", imageUrl);
        } catch (error) {
          console.error("Error al subir el archivo:", error);
        }
      }
    },
  },
};
</script>
