<template>
  <footer class="flex justify-center px-4 text-gray-800 bg-white mt-10">
    <div class="container px-6 py-6 relative">
      <!-- <CarIllustration class="scale-50 absolute bottom-1/3 right-0" /> -->
      <hr class="h-px bg-gray-200 border-none mt-3 mb-7" />

      <div class="flex flex-col items-center justify-between md:flex-row">
        <div>
          <a
            href="#"
            class="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-gray-700"
          >
            Simula Car
          </a>
        </div>

        <div class="flex mt-4 md:m-0">
          <div class="-mx-4">
            <a
              href="https://salescreations.com.br/"
              target="_blank"
              class="px-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 hover:underline"
            >
              Created by Sales//Creations
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import CarIllustration from '../components/CarIllustration.vue'
export default {
	components: {
		CarIllustration,
	}
}
</script>
