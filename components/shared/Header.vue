<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <nuxt-link to="/" class="flex space-x-2 items-center -m-1.5 p-1.5">
          <img class="h-10 w-auto" src="@/assets/images/Logo.svg" alt="" />
          <span class="text-lg font-semibold">Doggy Stickers</span>
        </nuxt-link>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          @click="toggleCart"
          class="text-xs uppercase font-semibold leading-6 !text-primary text-opacity-60"
        >
          <CartIcon class="w-6 h-6 text-primary" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import CartIcon from "@/components/shared/icons/CartIcon.vue";

export default {
  name: "Header",
  components: {
    CartIcon,
  },
  methods: {
    toggleCart() {
      this.$emit("click");
    },
  },
};
</script>
