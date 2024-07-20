<template>
  <div>
    <Title :pageTitle="'Blog'" />
    <h1 class="text-2xl font-semibold mb-4 pt-4">Blog</h1>
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input v-model="search" @input="searchData" type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              ID
            </th>
            <th scope="col" class="px-6 py-3">
              Judul Blog
            </th>
            <th scope="col" class="px-6 py-3">
              Kategori
            </th>
            <th scope="col" class="px-6 py-3">
              Penulis
            </th>
            <th scope="col" class="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="blog in filteredBlogs" :key="blog.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ blog.id }}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ blog.title }}
            </td>
            <td class="px-6 py-4">
              {{ blog.category.name }}
            </td>
            <td class="px-6 py-4">
              {{ blog.user.name }}
            </td>
            <td class="px-9 py-4 flex space-x-4">
              <router-link :to="{ name: 'admin-blog-edit-id', params: { id: blog.id } }" class="text-blue-600 dark:text-blue-500 hover:underline">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.304 4.844 16.156 6.696M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844-1.707-1.707 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                </svg>
              </router-link>
              <a href="#" @click.prevent="deleteBlog(blog.id)" class="text-red-600 dark:text-red-500 hover:underline">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="flex items-center flex-wrap md:flex-row justify-between pt-4 md:pb-20" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{{ paginationBlogs.from }}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{ paginationBlogs.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ paginationBlogs.total }}</span>
      </span>
      <ul class="inline-flex -space-x-px text-sm h-8">
        <li>
          <button @click.prevent="changePageBlogs(paginationBlogs.current_page - 1)" :disabled="!paginationBlogs.prev_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        <li v-for="page in paginationBlogs.last_page" :key="page">
          <button @click.prevent="changePageBlogs(page)" :class="{'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white': page === paginationBlogs.current_page, 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== paginationBlogs.current_page}" class="flex items-center justify-center px-3 h-8 leading-tight border">
            {{ page }}
          </button>
        </li>
        <li>
          <button @click.prevent="changePageBlogs(paginationBlogs.current_page + 1)" :disabled="!paginationBlogs.next_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
        </li>
      </ul>
    </nav>



    <!-- Category Section -->
    <div class="pt-12 md:pb-20">
      <h1 class="text-2xl font-semibold mb-4">Category</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-9 py-3">Nama Kategori</th>
              <th scope="col" class="px-9 py-3">Slug</th>
              <th scope="col" class="px-9 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in filteredCategories" :key="category.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-9 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ category.name }}</td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ category.slug }}
              </td>
              <td class="px-9 py-4 flex space-x-4">
                <router-link :to="{ name: 'admin-blog-category-edit-id', params: { id: category.id } }" class="text-blue-600 dark:text-blue-500 hover:underline">
                  <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.304 4.844 16.156 6.696M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844-1.707-1.707 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                </router-link>
                <a href="#" @click.prevent="deleteCategory(category.id)" class="text-red-600 dark:text-red-500 hover:underline">
                  <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">{{ paginationCategories.from }}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{ paginationCategories.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ paginationCategories.total }}</span></span>
        <ul class="inline-flex -space-x-px text-sm h-8">
          <li>
            <button @click.prevent="changePageCategories(paginationCategories.current_page - 1, 'categories')" :disabled="!paginationCategories.prev_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
          </li>
          <li v-for="page in paginationCategories.last_page" :key="page">
            <button @click.prevent="changePageCategories(page, 'categories')" :class="{'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white': page === paginationCategories.current_page, 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== paginationCategories.current_page}" class="flex items-center justify-center px-3 h-8 leading-tight border">
              {{ page }}
            </button>
          </li>
          <li>
            <button @click.prevent="changePageCategories(paginationCategories.current_page + 1, 'categories')" :disabled="!paginationCategories.next_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
          </li>
        </ul>
      </nav>

<div data-dial-init class="fixed end-6 bottom-6 group">
  <div
    id="speed-dial-menu-dropdown-alternative"
    class="flex flex-col justify-end py-1 mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600"
    v-show="isActionMenuOpen"
  >
        <ul class="text-sm text-gray-500 dark:text-gray-300">
            <li>
              <nuxt-link :to="{ name: 'admin-blog-create' }" class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                    </svg>
                    <span class="text-sm font-medium">Tambah Blog</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'admin-blog-category-create' }" class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M19 4h-1a1 1 0 1 0 0 2v11a1 1 0 0 1-2 0V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a1 1 0 0 0-1-1ZM3 4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Zm9 13H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-3H4a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Zm0-3h-2a1 1 0 0 1 0-2h2a1 1 0 1 1 0 2Z"/>
                        <path d="M6 5H5v1h1V5Z"/>
                    </svg>
                    <span class="text-sm font-medium">Tambah Category</span>
              </nuxt-link>
            </li>
        </ul>
    </div>
    <button
    type="button"
    @click="toggleActionMenu"
    aria-controls="speed-dial-menu-dropdown-alternative"
    :aria-expanded="isActionMenuOpen"
    class="flex items-center justify-center ml-auto text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
  >
    <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z"/>
    </svg>
    <span class="sr-only">Open actions menu</span>
  </button>
</div>

  </div>
  </div>
</template>

<script>
import Title from '@/components/title.vue';
export default {
  layout: 'admin',

  data() {
    return {
      search: '',
      filteredBlogs: [],
      filteredCategories: [],
      paginationCategories: {},
      paginationBlogs: {},
      isActionMenuOpen: false
    };
  },

  async asyncData({ $axios, query }) {
    const search = query.q || '';
    const page = query.page || 1;

    try {
      const blogsResponse = await $axios.$get(`/api/admin/blogs?q=${search}&page=${page}`);
      const categoriesResponse = await $axios.$get(`/api/admin/categories?q=${search}&type=blogs&page=${page}`);
      return {
        filteredBlogs: blogsResponse.data.data,
        filteredCategories: categoriesResponse.data.data,
        paginationBlogs: blogsResponse.data,
        paginationCategories: categoriesResponse.data,
        search
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        filteredBlogs: [],
        filteredCategories: [],
        paginationBlogs: {},
        paginationCategories: {},
        search
      };
    }
  },

  methods: {
    toggleActionMenu() {
      this.isActionMenuOpen = !this.isActionMenuOpen;
    },

    async fetchBlog() {
      try {
        const response = await this.$axios.$get(`/api/admin/blogs?q=${this.search}`);
        this.filteredBlogs = response.data.data;
        this.paginationBlogs = response.data;
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    },

    async deleteBlog(id) {
      try {
        const confirmed = await this.$swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this blog.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });

        if (confirmed.isConfirmed) {
          await this.$axios.delete(`/api/admin/blogs/${id}`);
          await this.fetchBlog(); // Refresh data after deletion
          await this.$swal.fire({
            title: 'Deleted!',
            text: 'The blog has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        this.$swal.fire({
          title: 'Error',
          text: 'Failed to delete blog.',
          icon: 'error',
          timer: 2000
        });
      }
    },

    async changePageBlogs(page) {
      try {
        const response = await this.$axios.$get(`/api/admin/blogs?q=${this.search}&page=${page}`);
        this.filteredBlogs = response.data.data;
        this.paginationBlogs = response.data;
        this.$router.push({ path: this.$route.path, query: { q: this.search, page: page } });
      } catch (error) {
        console.error('Error changing page:', error);
      }
    },

    async fetchCategory() {
      try {
        const response = await this.$axios.$get(`/api/admin/categories?q=${this.search}&type=blogs`);
        this.filteredCategories = response.data.data;
        this.paginationCategories = response.data;
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    },

    async deleteCategory(id) {
      try {
        const confirmed = await this.$swal.fire({
          title: 'Are you sure?',
          text: 'You are about to delete this category.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });

        if (confirmed.isConfirmed) {
          await this.$axios.delete(`/api/admin/categories/${id}`);
          await this.fetchCategory(); // Refresh data after deletion
          await this.$swal.fire({
            title: 'Deleted!',
            text: 'The category has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        this.$swal.fire({
          title: 'Error',
          text: 'Failed to delete category.',
          icon: 'error',
          timer: 2000
        });
      }
    },

    async changePageCategories(page) {
      try {
        const response = await this.$axios.$get(`/api/admin/categories?q=${this.search}&type=blogs&page=${page}`);
        this.filteredCategories = response.data.data;
        this.paginationCategories = response.data;
        this.$router.push({ path: this.$route.path, query: { q: this.search, page: page } });
      } catch (error) {
        console.error('Error changing page:', error);
      }
    },

    searchData() {
      this.fetchBlog();
      this.fetchCategory();
    },
  }
};
</script>


<style scoped>
/* Add scoped styles if needed */
</style>
