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
import { db, firebase } from "@/plugins/firebase";
import "firebase/storage";

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
      },
      isLoading: false,
    };
  },
  mounted() {
    this.loadProduct();
  },
  methods: {
    async loadProduct() {
      try {
        const productHandle = this.$route.params.id;
        const productQuery = await db
          .collection("products")
          .where("handle", "==", productHandle)
          .get();

        if (productQuery.empty) {
          console.error("Producto no encontrado");
          return;
        }

        const productData = productQuery.docs[0].data();
        this.product = {
          image: productData.image,
          name: productData.name,
          handle: productData.handle,
          category: productData.category,
          price: productData.price,
          description: productData.description,
        };
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    },
    async onUpdate() {
      try {
        this.isLoading = true;
        const productQuery = await db
          .collection("products")
          .where("handle", "==", this.product.handle)
          .get();

        if (productQuery.empty) {
          console.error("Producto no encontrado");
          return;
        }

        const productId = productQuery.docs[0].id;
        const productRef = db.collection("products").doc(productId);

        await productRef.update({
          name: this.product.name,
          handle: this.product.handle,
          categories: this.product.category,
          price: this.product.price,
          description: this.product.description,
        });

        console.log("Producto actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      } finally {
        this.isLoading = false;
        alert("Producto actualizado correctamente");
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      fileRef
        .put(file)
        .then(() => {
          console.log("Archivo subido correctamente");
          // Aquí puedes obtener la URL del archivo subido y guardarla en tu objeto product si es necesario
        })
        .catch((error) => {
          console.error("Error al subir el archivo:", error);
        });
    },
  },
};
</script>
