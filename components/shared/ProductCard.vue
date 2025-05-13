<template>
  <div
    @click.stop="$router.push(slug)"
    class="group relative w-full max-w-sm mx-auto shadow-md bg-white rounded-lg overflow-hidden lg:max-w-none lg:mx-0 lg:shadow-none lg:bg-transparent lg:rounded-none cursor-pointer"
  >
    <div
      class="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-gray-200 overflow-hidden"
    >
      <img
        :src="image"
        alt="product image"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="mt-4 text-left px-3 pb-3">
      <span
        class="mt-1 text-xs text-gray-500 py-1 px-4 bg-secondary bg-opacity-5 mb-2 rounded-sm"
        >{{ category }}</span
      >
      <h4 class="mt-1">
        {{ name }}
      </h4>
      <p class="text-sm text-gray-500">COP {{ priceFormateado }}</p>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '@/utils/formatPrice';
export default {
  name: "ProductCard",
  props: {
    name: { type: String, default: "Basic Tee" },
    description: { type: String, default: "This is a short description" },
    category: { type: String, default: "shirt" },
    price: { type: [String, Number], default: 35 },
    slug: { type: String, default: "product-name" },
    image: { type: String, default: "" },
  },
  computed: {
    priceFormateado() {
      return formatPrice(Number(this.price));
    }
  }
};
</script>
