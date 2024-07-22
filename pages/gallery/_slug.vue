<template>
  <div>
    <!-- Breadcrumb Navigation -->
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
            <NuxtLink to="/gallery" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Gallery</NuxtLink>
          </li>
          <li class="inline-flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"/>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-400">{{ galleries.title }}</span>
          </li>
        </ol>
      </nav>
    </div>

    <!-- Media Card -->
    <div class="flex justify-center">
      <div class="mx-6 flex flex-col items-stretch bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <!-- Media Handling -->
        <div class="w-full rounded-t-lg md:w-96 md:rounded-none md:rounded-s-lg overflow-hidden">
          <template v-if="isImage(galleries.file)">
            <img class="object-cover w-full h-[500px] md:h-auto lazyLoad" :src="galleries.file" :alt="galleries.title">
          </template>
          <template v-else-if="isVideo(galleries.file)">
            <video class="object-cover w-full h-[500px] md:h-auto lazyLoad" controls>
              <source :src="galleries.file" :type="videoType">
              Your browser does not support the video tag.
            </video>
          </template>
        </div>
        <div class="flex flex-col justify-between p-8 leading-normal md:flex-1">
          <h5 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-left">{{ galleries.title }} {{ galleries.description }}</h5>
          <p class="mb-4 font-normal text-gray-700 dark:text-gray-400 text-left" v-html="galleries.content"></p>
          <div class="mt-auto w-full text-left">
            <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">Kategori:</p>
            <p class="mt-2 p-4 font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-xl shadow-lg dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600">
              {{ galleries.category.name }}
            </p>
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
      const galleryResponse = await $axios.$get(`/api/web/galleries/${params.slug}`);
      return {
        galleries: galleryResponse.data
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        galleries: null
      };
    }
  },

  computed: {
    // Check if the file is an image
    isImage() {
      return (file) => file && file.match(/\.(jpeg|jpg|gif|png)$/i);
    },
    // Check if the file is a video
    isVideo() {
      return (file) => file && file.match(/\.(mp4|webm|ogg|mov)$/i);
    },
    // Determine the video type
    videoType() {
      return this.galleries.file ? (this.galleries.file.endsWith('.webm') ? 'video/webm' : 'video/mp4') : '';
    }
  },

  head() {
    if (this.galleries) {
      return {
        title: this.galleries.title,
        meta: [
          { hid: 'og:title', name: 'og:title', content: this.galleries.title },
          { hid: 'og:site_name', name: 'og:site_name', content: this.galleries.title },
          { hid: 'og:image', name: 'og:image', content: this.galleries.image },
          { hid: 'description', name: 'description', content: this.galleries.description }
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
