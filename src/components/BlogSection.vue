<template>
  <div class="max-w mx-auto p-6">
    <div class="text-left mb-6">All Products</div>

    <div class="grid grid-cols-4 gap-6">
      <article
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <img src="https://" class="w-400 h-50 object-cover" />

        <div class="p-4">
          <p class="text-md font-semibold">Name {{ i }}</p>

          <p class="text-gray-600">$100</p>
        </div>
      </article>
    </div>
  </div>
</template>
