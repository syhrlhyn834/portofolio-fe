<template>
  <div class="mx-10 mt-5 mb-5">
    <div class="md:ml-10">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Home
            </NuxtLink>
          </li>
          <li class="inline-flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"/>
            </svg>
            <NuxtLink to="/blog" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Blog</NuxtLink>
          </li>
          <li class="inline-flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"/>
            </svg>
            <div>
            <NuxtLink v-if="category" :to="{ name: 'blog-category-slug', params: { slug: category.slug } }" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{ category.name }}</NuxtLink>
          </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="flex flex-wrap -mx-3">
      <div class="w-full px-3 mb-3">
        <h4 class="text-lg font-semibold" v-if="category"></h4>
        <h4 class="text-lg font-semibold" v-else>KATEGORI TIDAK DITEMUKAN</h4>
      </div>
      <div v-for="blog in paginatedBlogs" :key="blog.id" class="w-full sm:w-1/2 md:w-1/3 px-3 mb-3">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <img :src="blog.image" class="w-full lazyLoad" alt="Blog Image">
          <div class="p-4">
            <div class="text-gray-500 text-sm mb-2">
              <i class="fa fa-calendar"></i> {{ blog.created_at }}
            </div>
            <h5 class="text-lg font-bold mb-2">
              <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug }}">{{ blog.title }}</nuxt-link>
            </h5>
            <p class="text-gray-700 mb-2">
              {{ blog.description.substr(0, 55) }}...
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination controls -->
    <div class="mt-8">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px text-sm">
          <li>
            <button @click="fetchBlogs(currentPage - 1)" :disabled="currentPage === 1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
          </li>
          <li v-for="page in totalPages" :key="page">
            <button @click="fetchBlogs(page)" :class="{'text-blue-600 border-blue-500': currentPage === page, 'text-gray-500 bg-white border-gray-300': currentPage !== page}" class="flex items-center justify-center px-3 h-8 leading-tight border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</button>
          </li>
          <li>
            <button @click="fetchBlogs(currentPage + 1)" :disabled="currentPage === totalPages" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      currentPage: 1,
      perPage: 6, // jumlah maksimum blogs per halaman
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.blogs.length / this.perPage);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.blogs.slice(start, end);
    },
  },

  async asyncData({ params, $axios }) {
    try {
      const category = await $axios.$get(`/api/web/categories/${params.slug}`);
      return {
        category: category.data,
        blogs: category.data.blogs,
      };
    } catch (error) {
      console.error('Error fetching category:', error);
      return {
        category: null,
        blogs: [],
      };
    }
  },

  methods: {
    fetchBlogs(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya khusus di sini jika diperlukan */
</style>
