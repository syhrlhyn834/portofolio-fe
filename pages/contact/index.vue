<template>
  <div>
    <Title :pageTitle="'Contact'" />
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
            <NuxtLink to="/contact" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Contact</NuxtLink>
          </li>
        </ol>
      </nav>
    </div>
  <div class="flex justify-center items-center mt-4">
    <p>Feel free to contact me anytime
    </p>
  </div>
  <div class="flex justify-center items-center mt-1">
    <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 underline-animation">
      Get in Touch
    </h2>
  </div>
  <div class="flex justify-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div class="">
          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-y-6">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Message</h2>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label for="name" class="sr-only">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="given-name"
                  class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label for="email" class="sr-only">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  id="email"
                  class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div>
              <label for="subject" class="sr-only">Subject</label>
              <input
                v-model="form.subject"
                type="text"
                name="subject"
                id="subject"
                autocomplete="subject"
                class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Subject"
                required
              />
            </div>
            <div>
              <label for="message" class="sr-only">Message</label>
              <textarea
                v-model="form.message"
                id="message"
                name="message"
                rows="4"
                class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
      <div  v-for="contacts in contact" :key="contacts.id">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Contact Info</h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">{{ contacts.description }}</p>
        <div class="mt-8">
          <div class="flex items-center">
            <i class="bi bi-person text-4xl"></i>
            <div class="ml-4">
              <p class="text-sm font-bold text-gray-900">Name</p>
              <p class="text-sm font-medium text-gray-900">{{ contacts.name }}</p>
            </div>
          </div>
          <div class="flex items-center mt-4">
            <i class="bi bi-geo-alt text-4xl"></i>
            <div class="ml-4">
              <p class="text-sm font-bold text-gray-900">Location</p>
              <p class="text-sm font-medium text-gray-900">{{ contacts.location }}</p>
            </div>
          </div>
          <div class="flex items-center mt-4">
            <i class="bi bi-telephone-plus text-4xl"></i>
            <div class="ml-4">
              <p class="text-sm font-bold text-gray-900">Number</p>
              <p class="text-sm font-medium text-gray-900">{{ contacts.number }}</p>
            </div>
          </div>
          <div class="flex items-center mt-4">
            <i class="bi bi-envelope text-4xl"></i>
            <div class="ml-4">
              <p class="text-sm font-bold text-gray-900">Email</p>
              <p class="text-sm font-medium text-gray-900">{{ contacts.email }}</p>
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
  async asyncData({ $axios }) {
  try {
    const contactResponse = await $axios.get(`/api/web/contact`);
    return { contact: contactResponse.data.data }; // pastikan ini mengakses array di dalam data
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return { contact: [] }; // array kosong sebagai fallback
  }
}
,
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      validation: [],
    };
  },
  methods: {
  async submitForm() {
    let formData = new FormData();
    formData.append('name', this.form.name);
    formData.append('email', this.form.email);
    formData.append('subject', this.form.subject);
    formData.append('message', this.form.message);

    try {
      await this.$axios.post(`/api/web/inboxes/storeInbox`, formData);
      this.$swal.fire({
        title: 'BERHASIL!',
        text: "Data Berhasil Diupdate!",
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });

      // Reset form setelah berhasil dikirim
      this.form.name = '';
      this.form.email = '';
      this.form.subject = '';
      this.form.message = '';

    } catch (error) {
      this.validation = error.response.data;
    }
  }
}
}
</script>


<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@keyframes underline-move {
  0% {
    transform: translateX(-15%) scaleX(0);
  }
  50% {
    transform: translateX(0) scaleX(1);
  }
  100% {
    transform: translateX(115%) scaleX(0);
  }
}

.underline-animation {
  position: relative;
  display: inline-block;
}

.underline-animation::after {
  content: '';
  position: absolute;
  bottom: -3px; /* Atur jarak garis bawah dari teks */
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3b82f6; /* Warna garis bawah */
  transform-origin: bottom left;
  animation: underline-move 2s linear infinite;
}
</style>
