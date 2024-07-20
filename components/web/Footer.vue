<template>
  <div>
<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
  <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400" v-for="(footer, index) in footers" :key="`footer-copyright-${footer.id}-${index}`">{{ footer.copyright }}
  </span>
  <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
    <li>
      <nuxt-link to="/about" class="hover:underline me-4 md:me-6">About</nuxt-link>
  </li>
  <li>
      <nuxt-link to="/privacy-policy" class="hover:underline me-4 md:me-6">Privacy Policy</nuxt-link>
  </li>
  <li>
      <nuxt-link to="/licensing" class="hover:underline me-4 md:me-6">Licensing</nuxt-link>
  </li>
  <li>
      <nuxt-link to="/contact" class="hover:underline">Contact</nuxt-link>
  </li>
  </ul>
  </div>
</footer>

  </div>
</template>
<script>
export default {
  data() {
    return {
  footers: []
    };
  },
  async fetch() {
    try {
      const [footersResponse] = await Promise.all([
        this.$axios.get('/api/web/footers')
      ]);
      this.footers = footersResponse.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>

<style scoped>
/* Styling khusus untuk komponen ini */
.footer-section {
  margin-bottom: 2.5rem; /* Adjust the space between sections */
}

</style>
