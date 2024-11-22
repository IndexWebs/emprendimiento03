<template>
  <footer class="relative bg-white pt-8 pb-6">
    <div class="container mx-auto px-4">
      <div class="flex w-full justify-between">
        <div class="px-4">
          <nuxt-link to="/" class="flex items-center -ml-4 -m-1.5 p-1.5 mb-2">
            <img class="h-7 w-auto" src="@/assets/images/Logo.png" alt="" />
          </nuxt-link>
          <p class="text-xs">
            Vivimos en un mundo donde si no eres perfecto vas a sufrir por serlo...
          </p>
          <p class="text-xs">Normalizando lo imperfecto.</p>
        </div>
        <div class="items-end px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4">
              <span class="block uppercase text-primary text-opacity-70 text-xs font-semibold mb-2">Contacto</span>
              <ul class="list-unstyled text-xs">
                <li>
                  <a
                    class="text-gray-800 hover:text-primary text-opacity-70 hover:text-opacity-70 transition-all ease-out duration-300 block pb-2">lacirculander@gmail.com</a>
                </li>
                <li>
                  <a
                    class="text-gray-800 hover:text-primary text-opacity-70 hover:text-opacity-70 transition-all ease-out duration-300 block pb-2">+57 315 0361379</a>
                </li>
                <li>
                  <a class="text-gray-800 hover:text-primary text-opacity-70 hover:text-opacity-70 transition-all ease-out duration-300 block pb-2"
                    href="https://www.instagram.com/circulatelo/">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-primary border-opacity-30" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-xs text-gray-600 py-1">
            Diseño y desarrollo by:
            <a href="#" class="text-gray-600 hover:secondary">Index webs Creative team</a>.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
