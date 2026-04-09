<script setup lang="ts">
import CartIcon from './icons/CartIcon.vue';
import LoginIcon from './icons/LoginIcon.vue';
import logo from '../assets/Logo.png';
</script>

<template>
  <nav class="bg-white flex items-center h-16 mt-2">
    <div class="flex flex-1 justify-start gap-4 ml-10">
      <router-link to="/">
        <img :src="logo" alt="Logo" class="w-10 h-10 object-cover" />
      </router-link>
    </div>

        <div class="flex flex-1 justify-center gap-6">
            <button class=" hover:text-gray-700">
                <router-link to="/">
                Home
                </router-link>
            </button>
            <button class=" hover:text-gray-700">
                For Kids
            </button>
            <button class=" hover:text-gray-700">
                Categories
            </button>
        </div>


        <div class ="flex flex-1 justify-end gap-4 mr-10">
            <button class=" hover:text-gray-700">
                <CartIcon class="w-6 h-6 text-gray-700" />
            </button>
            <button class=" hover:text-gray-700 flex items-center gap-1 ">
                Log in 
                <LoginIcon class="w-6 h-6 text-gray-700 transform rotate-180" />
            </button>
        </div>
    </nav>
</template>