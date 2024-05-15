<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <nuxt-link to="/" class="flex space-x-2 items-center -m-1.5 p-1.5">
          <img
            class="h-10 w-auto"
            src="@/assets/images/Logo.svg"
            alt=""
          />
          <span class=" text-lg font-semibold">Doggy Stickers</span>
        </nuxt-link>
      </div>
      
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          @click="toggleCart"
          class="text-xs uppercase font-semibold leading-6 !text-primary text-opacity-60"
        >
        <img
            class="h-6 w-auto text-primary"
            src="@/assets/images/Cart.svg"
            alt=""
          />
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleCart() {
      this.$emit("click");
    },
  },
};
</script>