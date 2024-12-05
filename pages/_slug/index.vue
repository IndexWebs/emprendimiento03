<template>
  <div class="bg-white mx-0 md:mx-24 px-10 pb-8">
    <div class="pt-6">
      <nav aria-label="Breadcrumb" class="flex justify-between">
        <ol role="list" class="flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
          <li>
            <div class="flex items-center">
              <a href="#" class="mr-2 text-sm font-medium text-gray-900">Products</a>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                class="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <a href="#" class="mr-2 text-sm font-medium text-gray-900">{{
                product.category
                }}</a>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                class="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>

          <li class="text-sm">
            <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ product.name }}</a>
          </li>
        </ol>
        <nuxt-link to="/"
          class="font-medium text-secondary text-opacity-70 hover:text-opacity-50 transition-all duration-300 ease-in-out rounded-md uppercase text-xs">
          <span>Volver</span>
        </nuxt-link>
      </nav>

      <div class="grid grid-cols-12 mx-auto pt-8">
        <div class="col-span-12 md:col-span-6 pb-8 mt-4 mr-8">
          <div id="custom-controls-gallery" class="relative w-full">
            <!-- Carousel wrapper -->
            <div id="gallery" class="relative w-full">
              <!-- Carousel wrapper -->
              <div class="relative h-56 overflow-hidden rounded-lg md:h-100">
                <div v-for="(image, index) in product.images" :key="index" :class="[
                  ' duration-700 ease-in-out col-span-12 md:col-span-6 pb-8',
                  index === activeIndex ? 'block' : 'hidden'
                ]">
                  <img :src="image" class=" object-contain overflow-hidden object-center h-full w-full"
                    alt="" />
                </div>
              </div>
              <!-- Slider controls -->
              <button type="button"
                class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                @click="prevImage">
                <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4" />
                  </svg>
                  <span class="sr-only">Previous</span>
                </span>
              </button>
              <button type="button"
                class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                @click="nextImage">
                <span
                  class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4" />
                  </svg>
                  <span class="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-4 lg:row-span-3 lg:mt-0 col-span-12 md:col-span-6">
          <h1 class="text-2xl font-bold text-secondary sm:text-3xl mb-2 uppercase">
            {{ product.name }}
          </h1>
          <p class="text-2xl text-secondary mb-2 opacity-80 font-light">${{ product.price }}</p>
          <!-- <InputNumber :value="cantidad" @input="updaeValue" class="mb-2" /> -->
          <PrimaryButton @click="handleAddToCart" text="Agregar al carrito" />
          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Detalles</h3>
            <div class="mt-2">
              <p class="font-medium">Talle:<span class="lowercase font-light"> {{ product.talle }}</span></p>
              <p class="col-span-12 text-gray-500 font-light leading-7 mb-2">
                {{ product.description }}
              </p>
              <!-- <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li class="text-gray-400">
                  <span class="text-gray-600">{{ product.product_bodega ? product.product_bodega : '-' }}</span>
                </li>

              <li class="text-gray-400">
                  <span class="text-gray-600">{{product.product_year ? product.product_year : '-'}}</span>
                </li>
  
                <li class="text-gray-400">
                  <span class="text-gray-600">URUGUAY</span>
                </li>

                <li class="text-gray-400">
                  <span class="text-gray-600">750CC</span>
                </li>
              </ul> -->
            </div>
          </div>
          <!-- Reviews -->

          <!-- 
            <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Details</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">
                {{ product.text }}
              </p>
            </div>
          </div>
            
            <div class="mt-6">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
             
                <svg
                  class="text-gray-900 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <svg
                  class="text-gray-900 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <svg
                  class="text-gray-900 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <svg
                  class="text-gray-900 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>

                <svg
                  class="text-gray-200 h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p class="sr-only">4 out of 5 stars</p>
              <a
                href="#"
                class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >117 reviews</a
              >
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/plugins/eventBus";
// import InputNumber from "@/components/shared/inputs/InputNumber.vue";
import PrimaryButton from "~/components/shared/PrimaryButton.vue";

export default {
  async fetch({ store, params }) {
    await store.dispatch("fetchProductBySlug", params.slug);
  },
  data() {
    return {
      activeIndex: 0,
      cantidad: 1,
    };
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
  },
  components: { PrimaryButton },
  methods: {
    updaeValue(newOne) {
      this.cantidad = newOne;
    },
    handleAddToCart() {
      this.$store.dispatch("addToCart", {
        product: this.product,
        quantity: this.cantidad,
      });
      eventBus.$emit("addToCart");
    },
    nextImage() {
      this.activeIndex =
        (this.activeIndex + 1) % this.product.images.length;
    },
    prevImage() {
      this.activeIndex =
        (this.activeIndex - 1 + this.product.images.length) %
        this.product.images.length;
    },
  },
};
</script>