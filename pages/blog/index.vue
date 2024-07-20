<template>
  <div>
    <Title :pageTitle="'Blog'" />
  <div class="md:ml-10">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z"/>
            </svg>
            Home
          </NuxtLink>
        </li>
        <li class="inline-flex items-center">
          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"/>
          </svg>
          <NuxtLink to="/blog" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Blog</NuxtLink>
        </li>
      </ol>
    </nav>
  </div>
    <div class="mx-10">
    <div class="flex flex-col md:flex-row md:justify-between mt-10 md:ml-10">
      <div class="md:w-2/3">
        <div class="grid grid-cols-1 gap-8">
          <div v-for="blog in blogs" :key="blog.id" class="flex flex-col md:flex-row">
            <div class="md:w-1/3 mb-4 md:mb-0">
              <img :src="blog.image" loading="lazy" alt="Gambar kecil" class="w-full h-auto rounded-lg max-h-40 object-cover image-animation lazyLoad">
            </div>
            <div class="md:w-2/3 md:px-6">
              <div class="text-2xl font-bold mb-4 break-all max-w-full text-blue-500">
                <nuxt-link :to="{name: 'blog-slug', params: {slug: blog.slug}}">{{ blog.title }}</nuxt-link>
              </div>
              <div class="flex space-x-2 mb-2">
              <p class="text-sm mb-2 break-all"><i class="bi bi-calendar-heart-fill"></i> {{ blog.created_at }} </p>
              <p class="text-sm mb-2 break-all"><i class="bi bi-tags-fill"></i> {{ blog.category.name }} </p>
            </div>
              <p class="text-lg mb-2 break-all">{{ blog.description.substr(0, 100) }}...</p>
            </div>
          </div>
        </div>

        <!-- Pagination controls -->
        <div class="mt-8">
          <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <button @click="fetchBlogs(currentPage - 1)" :disabled="!pagination.prev_page_url" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
              </li>
              <li v-for="page in pagination.last_page" :key="page">
                <button @click="fetchBlogs(page)" :class="{'text-blue-600 border-blue-50': currentPage === page, 'text-gray-500 bg-white border-gray-300': currentPage !== page}" class="flex items-center justify-center px-3 h-8 leading-tight border hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</button>
              </li>
              <li>
                <button @click="fetchBlogs(currentPage + 1)" :disabled="!pagination.next_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="mt-10 md:w-1/3 w-full md:ml-10">
        <div class="border-0 rounded-lg shadow-md">
          <div class="p-4">
            <h5>KATEGORI</h5>
            <hr class="my-2">
            <div v-for="category in categories" :key="category.id" class="border-0 shadow-sm mb-2 rounded-lg bg-white">
              <div class="p-2 flex items-center space-x-2">
                <nuxt-link :to="{ name: 'blog-category-slug', params: { slug: category.slug }}" class="text-gray-800 hover:underline">
                  {{ category.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="border-0 rounded-lg shadow-md mt-4">
          <div class="p-4">
            <h5>BLOG TERBARU</h5>
            <hr class="my-2">
            <div v-for="latestBlog in latestBlogs" :key="latestBlog.id" class="border-0 shadow-sm mb-2 rounded-lg bg-white">
              <div class="p-2 flex items-start space-x-2">
                <img :src="latestBlog.image" alt="Gambar kecil" class="w-16 h-16 rounded-lg object-cover lazyLoad">
                <div>
                  <nuxt-link :to="{ name: 'blog-slug', params: { slug: latestBlog.slug }}" class="text-gray-800 hover:underline">
                    {{ latestBlog.title }}
                  </nuxt-link>
                  <p class="text-sm text-gray-600">{{ latestBlog.created_at }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Title from '@/components/title.vue';
export default {
  data() {
    return {
      blogs: [],
      categories: [],
      latestBlogs: [],
      currentPage: 1,
      pagination: {}
    };
  },
  methods: {
    async fetchBlogs(page = 1) {
      try {
        const response = await this.$axios.get(`/api/web/blogs?page=${page}`);
        this.blogs = response.data.data.data;
        this.pagination = response.data.data;
        this.currentPage = page;
        window.scrollTo(0, 0);  // Scroll to the top of the page
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.$get('/api/web/categories');
        this.categories = response.data.filter(category => category.type === 'blogs');
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  },
  async asyncData({ $axios }) {
    const page = 1;
    const blogsResponse = await $axios.get(`/api/web/blogs?page=${page}`);
    const categoryResponse = await $axios.$get('/api/web/categories');

    const blogs = blogsResponse.data.data.data;
    const pagination = blogsResponse.data.data;
    const filteredCategories = categoryResponse.data.data.filter(category => category.type === 'blogs');
    const latestBlogs = blogs.slice(0, 5);

    return {
      blogs,
      categories: filteredCategories,
      latestBlogs,
      pagination,
      currentPage: page
    };
  }
};
</script>

<style scoped>
.image-animation {
  transition: transform 0.2s ease-in-out;
}
.image-animation:hover {
  transform: scale(1.05);
}
</style>
