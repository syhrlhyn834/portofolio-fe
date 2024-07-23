<template>
  <div>
    <Title :pageTitle="'Gallery'" />
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
            <NuxtLink to="/gallery" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Gallery</NuxtLink>
          </li>
        </ol>
      </nav>
    </div>

    <div class="mx-10">
      <div class="mb-6">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Select</label>
          <select id="tabs" v-model="selectedTab" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="photos">Foto</option>
            <option value="videos">Video</option>
          </select>
        </div>
        <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-full focus-within:z-10">
            <a href="#" @click.prevent="selectTab('photos')" :class="{'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white': selectedTab === 'photos'}" class="inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700">Foto</a>
          </li>
          <li class="w-full focus-within:z-10">
            <a href="#" @click.prevent="selectTab('videos')" :class="{'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white': selectedTab === 'videos'}" class="inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700">Video</a>
          </li>
        </ul>
      </div>
      <div class="mb-6">
        <div class="sm:hidden">
          <label for="tabs" class="sr-only">Kategori</label>
          <select id="tabs" v-model="selectedCategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Semua Kategori</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-full focus-within:z-10">
            <a href="#" @click.prevent="selectCategory('')" :class="{'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white': selectedCategory === ''}" class="inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700">Semua Kategori</a>
          </li>
          <li class="w-full focus-within:z-10" v-for="category in categories" :key="category.id">
            <a href="#" @click.prevent="selectCategory(category.id)" :class="{'text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white': selectedCategory === category.id}" class="inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700">{{ category.name }}</a>
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="grid gap-4" v-for="(group, index) in galleryGroups" :key="index">
          <div v-for="gallery in group" :key="gallery.id">
            <div v-if="loading">
              <SkeletonLoader />
            </div>
            <div v-else>
              <div v-if="isImage(gallery.file)">
                <img :src="gallery.file" loading="lazy" class="h-auto max-w-full rounded-lg lazyLoad" :alt="gallery.title">
                <p class="font-bold text-lg md:text-xl">
                  <nuxt-link :to="{name: 'gallery-slug', params: {slug: gallery.slug}}">
                    {{ gallery.title.substr(0, 50) }}...
                  </nuxt-link>
                </p>
                <p class="text-xs md:text-sm">{{gallery.description.substr(0, 50)}}...</p>
              </div>
              <div v-else-if="isVideo(gallery.file)">
                <video controls class="h-auto max-w-full rounded-lg lazyLoad">
                  <source :src="gallery.file" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <p class="font-bold text-lg md:text-xl">
                  <nuxt-link :to="{name: 'gallery-slug', params: {slug: gallery.slug}}">
                    {{ gallery.title.substr(0, 50) }}...
                  </nuxt-link>
                </p>
                <p class="text-xs md:text-sm">{{gallery.description.substr(0, 50)}}</p>
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
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
  components: {
    SkeletonLoader,
  },
  data() {
    return {
      galleries: [],
      categories: [],
      currentPage: 1,
      pagination: {},
      selectedTab: 'photos',
      selectedCategory: '',
      loading: true, // Menambahkan properti loading
    };
  },
  computed: {
    filteredGalleries() {
      return this.galleries.filter(gallery => {
        const matchesTab = this.selectedTab === 'photos' ? this.isImage(gallery.file) : this.isVideo(gallery.file);
        const matchesCategory = this.selectedCategory ? gallery.category_id === this.selectedCategory : true;
        return matchesTab && matchesCategory;
      });
    },
    galleryGroups() {
      const groups = [];
      for (let i = 0; i < this.filteredGalleries.length; i += 3) {
        groups.push(this.filteredGalleries.slice(i, i + 3));
      }
      return groups;
    }
  },
  methods: {
    isImage(file) {
      return /\.(jpg|jpeg|png|gif)$/i.test(file);
    },
    isVideo(file) {
      return /\.(mp4|webm|ogg|mov)$/i.test(file);
    },
    async fetchGalleries(page = 1) {
      this.loading = true; // Set loading to true
      try {
        const response = await this.$axios.get(`/api/web/galleries?page=${page}`);
        this.galleries = response.data.data.data;
        this.pagination = response.data.data;
        this.currentPage = page;
        this.loading = false; // Set loading to false after data is loaded
        window.scrollTo(0, 0);  // Scroll to the top of the page
      } catch (error) {
        console.error('Error fetching galleries:', error);
        this.loading = false; // Set loading to false if there's an error
      }
    },
    async fetchCategories() {
      try {
        const response = await this.$axios.$get('/api/web/categories');
        this.categories = response.data.filter(category => category.type === 'galleries');
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    }
  },
  async asyncData({ $axios }) {
    const page = 1;
    const galleriesResponse = await $axios.get(`/api/web/galleries?page=${page}`);
    const categoryResponse = await $axios.$get('/api/web/categories');

    const galleries = galleriesResponse.data.data.data;
    const pagination = galleriesResponse.data.data;
    const filteredCategories = categoryResponse.data.data.filter(category => category.type === 'galleries');

    return {
      galleries,
      categories: filteredCategories,
      pagination,
      currentPage: page,
      loading: false, // Initialize loading to false in asyncData
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
