<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-4">Error Page</h1>
      <p v-if="errorCode === 404" class="text-red-500 mb-4">Halaman tidak ditemukan.</p>
      <p v-else class="text-red-500 mb-4">Terjadi kesalahan. Kode error: {{ errorCode }}</p>
      <!-- Tambahan logika atau pesan kesalahan sesuai kebutuhan -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorCode: {
      type: Number,
      default: 500
    }
  },
  created() {
    // Handle errors globally
    window.addEventListener('error', this.handleError);
  },
  destroyed() {
    // Clean up event listener
    window.removeEventListener('error', this.handleError);
  },
  methods: {
    handleError(event) {
      // Example: Log all errors to console
      console.error('Global Error Handler:', event);
      // You can also update state or perform other actions based on the error
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling tambahan di sini jika diperlukan */
</style>
