<script setup lang="ts">
import bicycleImage from "../assets/bicycle.jpg";
import { router } from "../router";
</script>

<template>
  <div class="max-w mx-auto p-6">
    <div class="text-left mb-6">All Products</div>

    <div class="grid grid-cols-4 gap-6">
      <Banner v-for="i in 8"
          :key="i"
          class="bg-white rounded-lg shadow overflow-hidden"
        >
      <router-link to="/item/1">
        
          
          <img :src="bicycleImage" class="w-400 h-50 object-cover" />

          <div class="p-4 flex justify-between items-center">
            <p class="text-md font-semibold">Name {{ i }}</p>

            <p class="text-gray-600">$ Price {{ i }}</p>
          </div>
        
      </router-link>
      </Banner>
    </div>
  </div>
</template>
