<template>
  <div class="container mx-auto px-4">
    <Title :pageTitle="'Edit Category'" />
    <h1 class="text-2xl font-semibold mb-4">Edit Category</h1>
    <form @submit.prevent="updateCategory" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="category.name" type="text" id="name" name="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
          <p v-if="validation.name" class="text-red-500 text-sm mt-1">{{ validation.name[0] }}</p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex">
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Update Category
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Title from '@/components/title.vue';
export default {
  layout: 'admin',

  data() {
    return {
      category: {
        name: '',
        type: 'blogs'
      },
      validation: [],
    }
  },

  mounted() {
    // Fetching data category by ID
    this.$axios.get(`/api/admin/categories/${this.$route.params.id}`)
      .then(response => {
        // Assign response data to state "category"
        this.category.name = response.data.data.name
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  },

  methods: {
    async updateCategory() {
      let formData = new FormData();
      formData.append('name', this.category.name);
      formData.append('type', this.category.type); // Corrected to use this.category.type
      formData.append("_method", "PATCH");

      try {
        await this.$axios.post(`/api/admin/categories/${this.$route.params.id}`, formData);
        this.$swal.fire({
          title: 'Success!',
          text: "Data updated successfully!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.$router.push({ name: 'admin-blog' });
      } catch (error) {
        this.validation = error.response.data;
      }
    }
  }
}
</script>

<style>
</style>
