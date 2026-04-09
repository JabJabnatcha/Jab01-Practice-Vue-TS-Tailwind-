<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TopBar from '../components/TopBar.vue';
import SearchBar from '../components/SearchBar.vue';
import ProductCard from '../components/ProductCard.vue';
import { getAllProducts } from '../services/Productservice';
import type { Product } from '../services/Productservice';

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref('');
const searchKeyword = ref('');

const filteredProducts = computed(() => {
  if (!searchKeyword.value) {
    return products.value;
  }
  const query = searchKeyword.value.toLowerCase();
  return products.value.filter(product =>
    product.productName.toLowerCase().includes(query) ||
    product.categories.toLowerCase().includes(query)
  );
});

const handleSearch = (keyword: string) => {
  searchKeyword.value = keyword;
};

const fetchProducts = async () => {
  loading.value = true;
  error.value = '';
  try {
    products.value = await getAllProducts();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load products';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopBar />

    <main class="container mx-auto px-4 py-8">


      <SearchBar @search="handleSearch" />

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-600 text-lg">{{ error }}</p>
        <button @click="fetchProducts" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Try Again
        </button>
      </div>

      <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500 text-lg">No products found.</p>
      </div>
    </main>
  </div>
</template>