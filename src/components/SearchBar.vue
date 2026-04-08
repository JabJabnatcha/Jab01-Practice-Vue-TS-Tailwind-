<script setup lang="ts">
import { ref } from "vue";
import SearchIcon from "./icons/SearchIcon.vue";

const keyword = ref("");

const handleSearch = () => {
  console.log("Search:", keyword.value);
};
</script>

<template>
  <div class="flex justify-center gap-2 ml-10 mr-10 mt-6">
    
    <div class="relative w-full">
      <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <input
        v-model="keyword"
        type="text"
        placeholder="Search product name..."
        class="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        @keyup.enter="handleSearch"
      />
    </div>

    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
    >
      <SearchIcon class="w-5 h-5 text-white" />
      Search
    </button>
  </div>
</template>
