<template>
  <div>
    <Navbar class="hidden lg:block" />
    <div class="px-5 lg:px-32 py-5 lg:py-32 bg-background min-h-screen">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/admin/Navbar.vue";
export default {
  components: { Navbar },
};
</script>
