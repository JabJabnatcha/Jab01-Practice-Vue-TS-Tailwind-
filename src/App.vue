<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template> -->
<!-- <template>
  <div class="flex items-center justify-center h-screen bg-red-500">
    <h1 class="text-4xl font-bold text-blue-500">
      Tailwind ใช้งานได้แล้ว 🚀
    </h1>
  </div>
</template> -->
<script setup lang="ts">
import { ref } from 'vue'

// state
const count = ref<number>(0)

// function
const increase = () => {
  count.value++
}

const decrease = () => {
  count.value--
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-blue-500">
    <h1 class="text-3xl font-bold mb-4">Composition API Test</h1>

    <p class="text-2xl mb-4">Count: {{ count }}</p>

    <div class="flex gap-4">
      <button
        class="px-4 py-2 bg-green-500 text-white rounded"
        @click="increase"
      >
        +1
      </button>

      <button
        class="px-4 py-2 bg-red-500 text-white rounded"
        @click="decrease"
      >
        -1
      </button>
    </div>
  </div>
</template>