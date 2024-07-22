<template>
  <div>
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
            <NuxtLink v-if="blog" :to="{ name: 'blog-slug', params: { slug: blog.slug } }" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{ blog.title }}</NuxtLink>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mx-10 flex flex-col md:flex-row">
      <div class="w-full md:w-3/4">
        <div class="mt-10 ml-2 md:ml-20">
          <template v-if="blog">
            <h1 class="text-3xl font-bold text-blue-500 mb-4">{{ blog.title }}</h1>
            <div class="flex flex-wrap space-x-2 mb-8">
              <p class="text-xs md:text-sm"><i class="bi bi-calendar-heart-fill"></i> {{ blog.created_at }}</p>
              <p class="text-xs md:text-sm"><i class="bi bi-tags-fill"></i> {{ blog.category.name }}</p>
              <p class="text-xs md:text-sm"><i class="bi bi-pencil-square"></i> {{ blog.user.name }}</p>
            </div>
            <img :src="blog.image" alt="Blog Image" class="w-full md:w-full h-auto rounded-lg mb-6 lazyLoad">
            <div class="mb-4">{{ blog.description }}</div>
            <div v-html="blog.content" class="prose"></div>
          </template>
          <template v-else>
            <p>Blog not found huuuuuu</p>
          </template>
        </div>
      </div>


      <div class="mt-10 md:mt-52 md:w-1/4 w-full md:ml-10">
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
            <div v-for="blogHomepage in blogHomepages" :key="blogHomepage.id" class="border-0 shadow-sm mb-2 rounded-lg bg-white">
              <div class="p-2 flex items-start space-x-2">
                <img :src="blogHomepage.image" alt="Gambar kecil" class="w-12 h-12 rounded-lg object-cover lazyLoad">
                <div>
                  <nuxt-link :to="{ name: 'blog-slug', params: { slug: blogHomepage.slug }}" class="text-gray-800 hover:underline">
                    {{ blogHomepage.title }}
                  </nuxt-link>
                  <p class="text-sm text-gray-600">{{ blogHomepage.created_at }}</p>
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
export default {
  layout: 'header',
  async asyncData({ params, $axios }) {
  try {
    const [blogResponse, categoriesResponse, blogHomepagesResponse] = await Promise.all([
      $axios.$get(`/api/web/blogs/${params.slug}`),
      $axios.$get('/api/web/categorySidebar'),
      $axios.$get('/api/web/blogHomepage')
    ]);

    // Filter kategori berdasarkan tipe
    const filteredCategories = categoriesResponse.data.filter(category => category.type === 'blogs');

    return {
      blog: blogResponse.data,
      categories: filteredCategories,
      blogHomepages: blogHomepagesResponse.data
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      blog: null,
      categories: [],
      blogHomepages: []
    };
  }
},

  head() {
    if (this.blog) {
      return {
        title: this.blog.title,
        meta: [
          { hid: 'og:title', name: 'og:title', content: this.blog.title },
          { hid: 'og:site_name', name: 'og:site_name', content: this.blog.title },
          { hid: 'og:image', name: 'og:image', content: this.blog.image },
          { hid: 'description', name: 'description', content: this.blog.description }
        ]
      };
    } else {
      return {
        title: 'Loading...',
        meta: [
          { hid: 'description', name: 'description', content: 'Loading...' }
        ]
      };
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
.image-animation {
  transition: transform 0.2s ease-in-out;
}
.image-animation:hover {
  transform: scale(1.05);
}
</style>
