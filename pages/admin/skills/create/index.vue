<template>
  <div class="pt-4">
    <Title :pageTitle="'Add Skills'" />
    <form @submit.prevent="storeSkill">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Skills</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">This information will be show in Public.</p>
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
              <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-full"
                   @dragover.prevent @dragenter.prevent @drop.prevent="handleFileDrop">
                <div class="text-center">
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span class="text-center">Upload a file</span>
                      <input id="file-upload" type="file" class="sr-only" @change="handleFileChange" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, SVG up to 10MB</p>
                  <div class="pt-8">
                    <img v-if="!imagePreview && skill.image" :src="skill.image" alt="Old Image Preview" class="mt-4 h-28 w-full object-cover" />
                    <img v-if="imagePreview" :src="imagePreview" alt="New Image Preview" class="mt-4 h-28 w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div class="mt-2">
                <input type="text" v-model="skill.description" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div v-if="validation.description" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.description[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</template>
<script>
import Title from '@/components/title.vue';
export default {
  //layout
  layout: 'admin',


  data() {
      return {
          //state skill
          skill: {
              image: '',
              description: ''
          },
          //state validation
          validation: [],

          imagePreview: null
      }
  },

  methods: {
    handleFileChange(e) {
  let image = e.target.files[0];
  if (!image) {
    // If no file is selected
    this.skill.image = null;
    this.imagePreview = null;
    this.$swal.fire({
      title: 'OOPS!',
      text: "Tidak ada file yang dipilih!",
      icon: 'error',
      showConfirmButton: false,
      timer: 2000
    });
    return;
  }
  if (!image.type.match('image.*')) {
    e.target.value = '';
    this.skill.image = null;
    this.imagePreview = null;
    this.$swal.fire({
      title: 'OOPS!',
      text: "Format File Tidak Didukung!",
      icon: 'error',
      showConfirmButton: false,
      timer: 2000
    });
  } else {
    this.skill.image = image;
    this.imagePreview = URL.createObjectURL(image);
  }
},
handleFileDrop(e) {
  e.preventDefault();
  let image = e.dataTransfer.files[0];
  if (!image) {
    // If no file is dropped
    this.$swal.fire({
      title: 'OOPS!',
      text: "Tidak ada file yang di-drop!",
      icon: 'error',
      showConfirmButton: false,
      timer: 2000
    });
    return;
  }
  if (!image.type.match('image.*')) {
    this.$swal.fire({
      title: 'OOPS!',
      text: "Format File Tidak Didukung!",
      icon: 'error',
      showConfirmButton: false,
      timer: 2000
    });
  } else {
    this.skill.image = image;
    this.imagePreview = URL.createObjectURL(image);
  }
},
      //storeSkill method
      async storeSkill() {
      let formData = new FormData();
      formData.append('image', this.skill.image);
      formData.append('description', this.skill.description);

      try {
        await this.$axios.post(`/api/admin/skills`, formData);
        this.$swal.fire({
          title: 'BERHASIL!',
          text: "Data Berhasil Diupdate!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.$router.push({ name: 'admin-skills' });
      } catch (error) {
        this.validation = error.response.data;
      }
    }
  }

}
</script>
