<template>
  <div>
    <!-- navbar -->
    <Navbar />
    <div class="mt-20 sm:mb-0 mb-22">
      <!-- content -->
      <Nuxt />
    </div>


    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/web/Navbar.vue'
import Footer from '@/components/web/Footer.vue'
export default {
  components: {
      Navbar,
      Footer
    },

  data() {
    return {
      image: null
    };
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('/api/web/headers');
      const data = response.data;
      const defaultImage = data && data.length > 0 ? data[0].image : null;

      return {
        image: defaultImage
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        image: null
      };
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.$get('/api/web/headers');
        const data = response.data;
        this.image = data && data.length > 0 ? data[0].image : null;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      this.updateDocumentHead();
    },
    updateDocumentHead() {
      if (process.client) {
        // Update favicon
        const linkIcon = document.querySelector('link[rel="icon"]');
        if (linkIcon) {
          linkIcon.setAttribute('href', this.image || '/default-icon.png');
        } else {
          const newLinkIcon = document.createElement('link');
          newLinkIcon.rel = 'icon';
          newLinkIcon.href = this.image || '/default-icon.png';
          document.head.appendChild(newLinkIcon);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Add CSS styles if needed */
</style>
