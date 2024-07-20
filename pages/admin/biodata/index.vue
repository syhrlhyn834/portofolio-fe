<template>
  <div class="pt-4">
    <Title :pageTitle="'Biodata'" />
    <form @submit.prevent="updateBiodata">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Biodata</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nama Lengkap</label>
              <div class="mt-2">
                <input type="text" v-model="biodata.name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div v-if="validation.name" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.name[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Umur</label>
              <div class="mt-2">
                <input type="text" v-model="biodata.age" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div v-if="validation.age" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.age[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="from" class="block text-sm font-medium leading-6 text-gray-900">Asal</label>
              <div class="mt-2">
                <input type="text" v-model="biodata.from" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div v-if="validation.from" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.from[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div class="mt-2">
                <textarea v-model="biodata.description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
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

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="content" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
              <div class="mt-2">
                <textarea v-model="biodata.content" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                <div v-if="validation.content" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">{{ validation.content[0] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
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
                <!-- Only show the old image if there's no new image -->
                <img v-if="!imagePreview && biodata.image" :src="biodata.image" alt="Old Image Preview" class="mt-4 h-28 w-50 object-cover" />
                <!-- Show the new image preview -->
                <img v-if="imagePreview" :src="imagePreview" alt="New Image Preview" class="mt-4 h-28 w-50 object-cover" />
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
  layout: 'admin',
  data() {
  return {
    //state biodata
    biodata: {
      image: '',
      name: '',
      age: '',
      from: '',
      content: '',
      description: ''
    },
    //state validation
    validation: [],
    //state for image preview
    imagePreview: null
  }
},


    mounted() {

      //fetching data biodata
      this.$axios.get(`/api/admin/biodatas/1`)

        .then(response => {

          //assing response data to state "biodata.name"
          this.biodata.name = response.data.data.name

          //assing response data to state "biodata.name"
          this.biodata.image = response.data.data.image

          //assing response data to state "biodata.age"
          this.biodata.age = response.data.data.age

          //assing response data to state "biodata.from"
          this.biodata.from = response.data.data.from

          //assing response data to state "biodata.content"
          this.biodata.content = response.data.data.content

          //assing response data to state "biodata.description"
          this.biodata.description = response.data.data.description
        })


    },

    methods: {
      handleFileChange(e) {
  let image = e.target.files[0];
  if (!image) {
    // If no file is selected
    this.biodata.image = null;
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
    this.biodata.image = null;
    this.imagePreview = null;
    this.$swal.fire({
      title: 'OOPS!',
      text: "Format File Tidak Didukung!",
      icon: 'error',
      showConfirmButton: false,
      timer: 2000
    });
  } else {
    this.biodata.image = image;
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
    this.biodata.image = image;
    this.imagePreview = URL.createObjectURL(image);
  }
},
  async updateBiodata() {
    // Define formData
    let formData = new FormData();

    // Append image only if it is a File object
    if (this.biodata.image instanceof File) {
        formData.append('image', this.biodata.image);
      };
    formData.append('name', this.biodata.name);
    formData.append('age', this.biodata.age);
    formData.append('from', this.biodata.from);
    formData.append('content', this.biodata.content);
    formData.append('description', this.biodata.description);
    formData.append("_method", "PATCH");

    // Sending data to server
    await this.$axios.post(`/api/admin/biodatas/1`, formData)
      .then(() => {
        // Sweet alert
        this.$swal.fire({
          title: 'BERHASIL!',
          text: "Data Berhasil Diupdate!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });

        // Redirect, if success store data
        this.$router.push({
          name: 'admin-biodata'
        });
      })
      .catch(error => {
        // Assign error to state "validation"
        this.validation = error.response.data;
      });
  }
}
}

</script>

<style>
</style>
