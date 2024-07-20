<template>
  <div class="flex flex-col md:flex-row">
    <Sidebar />
    <div class="flex-1 mt-18 p-4 max-w-full mx-auto md:max-w-7xl md:ml-64">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/admin/Sidebar.vue'
export default {
  middleware: 'auth',
  components: {
    Sidebar
  }
}
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
