import { ref, computed, onMounted } from "vue";
import { getAllProducts } from "../services/Productservice";
import type { Product } from "../services/Productservice";

export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref("");
  const searchKeyword = ref("");

  const filteredProducts = computed(() => {
    const query = searchKeyword.value.trim().toLowerCase();
    if (!query) return products.value;

    return products.value.filter(
      (product) =>
        (product.productName ?? "").toLowerCase().includes(query) ||
        (product.categories ?? "").toLowerCase().includes(query),
    );
  });

  const handleSearch = (keyword: string) => {
    searchKeyword.value = keyword;
  };

  const fetchProducts = async () => {
    loading.value = true;
    error.value = "";
    try {
      products.value = await getAllProducts();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to load products";
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchProducts();
  });

  return {
    products,
    loading,
    error,
    searchKeyword,
    filteredProducts,
    handleSearch,
    fetchProducts,
  };
}
