<!-- src/components/ProductCard.vue -->
<script setup lang="ts">
import bicycleImage from "../assets/bicycle.jpg";
</script>

<template>
  <div class="flex bg-white ml-10 mr-10 mt-10 rounded-lg shadow overflow-hidden">

    <!-- ฝั่งซ้าย: รูปพอดี container -->
    <div class="w-2/3 flex shrink">
      <img 
        :src="bicycleImage" 
        alt="Product" 
        class="w-full h-full max-h-150 object-cover rounded-l-lg" 
      />
    </div>

    <div class="w-1/3 p-4 flex flex-col justify-start bg-white gap-2 text-left border-l border-gray-300">
      <div class="font-semibold text-gray-800">Product Name</div>
      <div class="text-gray-700">Product Categories</div>
      <div class="text-gray-700">Price</div>
      <div class="text-gray-700">Quantity</div>
      <div class="text-gray-600 text-sm">Product details here</div>
      <div class="text-gray-600 text-sm">Stock X items</div>
    </div>
  </div>
</template>