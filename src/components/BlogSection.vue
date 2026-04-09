<script setup lang="ts">
import bicycleImage from "../assets/bicycle.jpg";
</script>

<template>
  <div class="max-w mx-auto p-6">
    <div class="text-left mb-6">All Products</div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <router-link to="/item/1" class="block">
          <img :src="bicycleImage" class="w-full h-48 object-cover" />
          <div class="p-4 flex justify-between items-center">
            <p class="text-md font-semibold">Name {{ i }}</p>
            <p class="text-gray-600">$ Price {{ i }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
