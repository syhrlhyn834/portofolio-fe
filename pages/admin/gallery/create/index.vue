<template>
  <div class="container mx-auto px-4">
    <Title :pageTitle="'Add Gallery'" />
    <h1 class="text-2xl font-semibold mb-4">Tambah Gallery</h1>
    <form @submit.prevent="storeGallery" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input v-model="gallery.title" type="text" id="title" name="title" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
          <p v-if="validation.title" class="text-red-500 text-sm mt-1">{{ validation.title[0] }}</p>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select v-model="gallery.category_id" id="category" name="category" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
          <p v-if="validation.category_id" class="text-red-500 text-sm mt-1">{{ validation.category_id[0] }}</p>
        </div>
      </div>

      <!-- Content -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
        <client-only placeholder="loading...">
          <ckeditor-nuxt v-model="gallery.content" :config="editorConfig" class="mt-1"></ckeditor-nuxt>
        </client-only>
        <p v-if="validation.content" class="text-red-500 text-sm mt-1">{{ validation.content[0] }}</p>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea v-model="gallery.description" id="description" name="description" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
        <p v-if="validation.description" class="text-red-500 text-sm mt-1">{{ validation.description[0] }}</p>
      </div>

      <!-- File Upload (Image or Video) -->
      <div class="mt-10">
        <label for="file-upload" class="block text-sm font-medium leading-6 text-gray-900">Upload a file</label>
        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
             @dragover.prevent @dragenter.prevent @drop.prevent="handleFileDrop">
          <div class="text-center">
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload a file</span>
                <input id="file-upload" type="file" class="sr-only" @change="handleFileChange" accept="image/*,video/*" /> <!-- Accept both image and video files -->
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, SVG, MP4, MOV, MKV, etc. up to 10MB</p>
            <p v-if="validation.FormData" class="text-red-500 text-sm mt-1">{{ validation.FormData[0] }}</p>
            <div v-if="imagePreview">
              <template v-if="isImagePreview">
                <img :src="imagePreview" alt="Image Preview" class="mt-4 h-80 w-120 object-cover" />
              </template>
              <template v-else>
                <video controls :src="imagePreview" class="mt-4 h-80 w-120 object-cover"></video>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Upload Gallery
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Title from '@/components/title.vue';
export default {
  layout: 'admin',

  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },

  data() {
    return {
      gallery: {
        FormData: null, // Rename 'image' to 'FormData' to accommodate both images and videos
        title: '',
        category_id: '',
        content: '',
        description: ''
      },
      categories: [],
      validation: [],
      imagePreview: null,
      isImagePreview: false, // To differentiate between image and video previews
      editorConfig: {
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: 'https://api.arlchoose.id/api/web/galleries/storeImage'
        }
      }
    }
  },

  async mounted() {
    try {
      const categoryResponse = await this.$axios.get('/api/admin/categories');
      if (categoryResponse.data && categoryResponse.data.data && Array.isArray(categoryResponse.data.data.data)) {
        this.categories = categoryResponse.data.data.data.filter(category => category.type === 'galleries');
      } else {
        console.error('Invalid response structure for categories:', categoryResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  methods: {
    handleFileChange(e) {
      let file = e.target.files[0];
      if (!file.type.match('image.*') && !file.type.match('video.*')) {
        e.target.value = '';
        this.gallery.FormData = null;
        this.imagePreview = null;
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        this.gallery.FormData = file;
        this.imagePreview = URL.createObjectURL(file);
        this.isImagePreview = file.type.match('image.*'); // Check if it's an image for preview differentiation
      }
    },
    handleFileDrop(e) {
      e.preventDefault();
      let file = e.dataTransfer.files[0];

      if (!file.type.match('image.*') && !file.type.match('video.*')) {
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        this.gallery.FormData = file;
        this.imagePreview = URL.createObjectURL(file);
        this.isImagePreview = file.type.match('image.*'); // Check if it's an image for preview differentiation
      }
    },
    async storeGallery() {
      let formData = new FormData();
      formData.append('file', this.gallery.FormData);
      formData.append('title', this.gallery.title);
      formData.append('category_id', this.gallery.category_id);
      formData.append('content', this.gallery.content);
      formData.append('description', this.gallery.description);

      try {
        await this.$axios.post(`/api/admin/galleries`, formData);
        this.$swal.fire({
          title: 'BERHASIL!',
          text: "Data Berhasil Diupdate!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.$router.push({ name: 'admin-gallery' });
      } catch (error) {
        this.validation = error.response.data;
      }
    }
  }
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
