<script setup lang="ts">
import type { Product } from '../services/Productservice';

defineProps<{ product: Product }>();

const getImageUrl = (imagePath: string) => {
  if (!imagePath || imagePath.trim() === '' || imagePath === 'test.png') {
    return '/src/assets/bicycle.jpg';
  }

  const cleanPath = imagePath.replace('/images//images/', '/images/');
  return `http://localhost:5111${cleanPath}`;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/src/assets/bicycle.jpg';
};
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
    <router-link :to="`/item/${product.id}`" class="block">
      <img
        :src="getImageUrl(product.image)"
        class="w-full h-52 object-cover"
        alt="Product image"
        @error="handleImageError"
      />
      <div class="p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold text-gray-600 mb-2">{{ product.productName }}</h3>
          <h3 class="text-lg font-semibold text-gray-600">${{ product.productPrice }}</h3>
        </div>
      </div>
    </router-link>
  </div>
</template>