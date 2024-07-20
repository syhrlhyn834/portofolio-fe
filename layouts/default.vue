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
  }
</script>

<style>
</style>
