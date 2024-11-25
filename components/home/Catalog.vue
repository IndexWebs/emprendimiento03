<template>
  <div class="grid grid-cols-12 gap-x-0 md:gap-x-8 gap-y-10 py-10">
    <ProductCard
      v-for="(product, index) in products"
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
