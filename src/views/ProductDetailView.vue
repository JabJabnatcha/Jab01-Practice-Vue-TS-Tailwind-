<script setup lang="ts">
import TopBar from '../components/TopBar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getProductById } from '../services/Productservice';
import type { Product } from '../services/Productservice';

const route = useRoute();
const product = ref<Product | null>(null);
const quantity = ref(1);

onMounted(async () => {
  const id = route.params.id as string;
  product.value = await getProductById(id);
});

const getImageUrl = (imagePath: string) => {
  if (!imagePath || imagePath.trim() === '' || imagePath === 'test.png') {
    return '/src/assets/bicycle.jpg'; // fallback image
  }

  // Fix double paths
  const cleanPath = imagePath.replace('/images//images/', '/images/');

  return `http://localhost:5111${cleanPath}`;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/src/assets/bicycle.jpg'; // fallback on error
};

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

const totalPrice = computed(() => {
  if (!product.value) return 0;
  return product.value.productPrice * quantity.value;
});

const canIncrease = computed(() => {
  return product.value ? quantity.value < product.value.stock : false;
});

const canDecrease = computed(() => {
  return quantity.value > 0;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopBar />

    <div v-if="product" class="container mx-auto px-4 py-8">

      <!-- Product Details Layout -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <!-- Product Image Section -->
          <div class="md:w-1/2">
            <div class="aspect-square bg-gray-100 flex items-center justify-center p-8">
              <img
                :src="getImageUrl(product.image)"
                alt="product image"
                class="max-w-full max-h-full object-contain"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Product Details Section -->
          <div class="md:w-1/2 p-8">
            <div class="space-y-6">
              <!-- Product Title -->
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.productName }}</h1>
                <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {{ product.categories }}
                </span>
              </div>

              <!-- Price -->
              <div class="flex items-baseline space-x-4">
                <span class="text-4xl font-bold text-blue-600">{{ product.productPrice }} ฿</span>
                <span class="text-lg text-gray-500">per item</span>
              </div>

              <!-- Stock Information -->
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">Stock:</span>
                <span
                  :class="[
                    'font-semibold',
                    product.stock > 10 ? 'text-green-600' :
                    product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  ]"
                >
                  {{ product.stock }} available
                </span>
              </div>

              <!-- Quantity Selector -->
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Quantity</label>
                <div class="flex items-center space-x-3">
                  <button
                    @click="decreaseQuantity"
                    :disabled="!canDecrease"
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                      canDecrease
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>

                  <span class="text-xl font-semibold w-12 text-center">{{ quantity }}</span>

                  <button
                    @click="increaseQuantity"
                    :disabled="!canIncrease"
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                      canIncrease
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    ]"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </button>
                </div>

                <!-- Quantity Limits Info -->
                <div class="text-sm text-gray-500">
                  <p v-if="quantity >= product.stock" class="text-yellow-600">
                    Maximum quantity reached ({{ product.stock }})
                  </p>
                  <p v-else-if="quantity === 0" class="text-gray-400">
                    Minimum quantity is 0
                  </p>
                </div>
              </div>

              <!-- Total Price -->
                <div class="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span class="text-blue-600">{{ totalPrice }} ฿</span>
                </div>
              

              <!-- Action Buttons -->
              <div class="space-y-3">
                <button
                  :disabled="quantity === 0"
                  :class="[
                    'w-full py-3 px-6 rounded-lg font-semibold transition-colors',
                    quantity > 0
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  Add to Cart
                </button>

                <button class="w-full py-3 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading product details...</p>
      </div>
    </div>
  </div>
</template>