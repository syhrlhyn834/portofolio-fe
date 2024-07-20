<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Title :pageTitle="'App'" />
    <div class="text-center p-6 bg-white rounded-lg shadow-lg animate-pulse">
      <h1 class="text-4xl font-bold mb-4">Masih dalam Proses</h1>
      <p class="text-lg text-gray-700">Saya sedang mengerjakan halaman ini. Harap kembali lagi nanti!</p>
      <div class="mt-4 flex justify-center">
        <svg class="w-16 h-16 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from '@/components/title.vue';
</script>

<style scoped>
</style>
