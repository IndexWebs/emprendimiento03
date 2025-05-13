<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-0 md:gap-x-8 gap-y-10 py-10">
    <ProductCard
      v-for="(product, index) in products"
      v-if="product.stock"
      :key="index"
      :name="product.name"
      :category="product.category"
      :image="product.images[0]"
      :slug="product.handle"
      :price="product.price"
    />
  </div>
</template>

<script>
import ProductCard from "@/components/shared/ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>
