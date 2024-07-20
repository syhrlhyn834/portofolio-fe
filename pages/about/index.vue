<template>
  <div>
    <Title :pageTitle="'About'" />
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
          <NuxtLink to="/about" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">About</NuxtLink>
        </li>
      </ol>
    </nav>
  </div>
    <div class="mx-10">
    <div class="flex justify-center items-center mt-4">
      <span class="w-3 h-3 me-3 bg-gray-200 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-gray-900 rounded-full dark:bg-gray-700"></span>
      <span class="w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-green-500 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-red-500 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-purple-500 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-indigo-500 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
      <span class="w-3 h-3 me-3 bg-teal-500 rounded-full"></span>
    </div>
    <div class="flex justify-center items-center mt-4">
    <p>Get to know me</p>
  </div>
    <div class="flex justify-center items-center mt-1">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 underline-animation">
        About Me
      </h2>
    </div>

    <div class="flex flex-col md:flex-row items-center mt-10 md:px-60" v-for="(biodata, index) in biodatas" :key="biodata.id">
      <div class="md:w-1/2 mb-4 md:mb-0">
        <v-img :lazy-src="biodata.image" loading="lazy" alt="Gambar besar" class="w-96 h-96 rounded-lg object-cover image-animation lazyLoad" />
      </div>
      <div class="md:w-1/2">
        <div class="text-2xl font-bold mb-4 break-all max-w-full text-blue-500">Who am i?</div>
        <div class="text-xl md:text-3xl font-bold mb-4 break-all max-w-full">
          {{ biodata.content }}
        </div>
        <p class="text-sm md:text-lg mb-2 md:w-full break-all">{{ biodata.description }}</p>
        <hr class="mb-4">
        <div v-for="(contact, index) in contacts" :key="contact.id">
          <div class="flex flex-col md:flex-row md:justify-between mb-4">
            <div class="flex flex-col mb-4 md:mb-0">
              <div class="text-sm md:text-lg mb-2">
                <span class="font-bold text-sm md:text-lg mb-2">Name:</span> {{ biodata.name }}
              </div>
              <div class="text-sm md:text-lg mb-2">
                <span class="font-bold text-sm md:text-lg mb-2">Age:</span> {{ biodata.age }} Years
              </div>
            </div>
            <div class="flex flex-col md:text-left">
              <div class="text-sm md:text-lg mb-2">
                <span class="font-bold text-sm md:text-lg mb-2">Email:</span>
                <a :href="'mailto:' + contact.email" class="text-blue-500 hover:underline">{{ contact.email }}</a>
              </div>
              <div class="text-sm md:text-lg mb-2">
                <span class="font-bold text-sm md:text-lg mb-2">From:</span> {{ biodata.from }}
              </div>
            </div>
          </div>
          <div class="flex flex-row md:justify-start">
            <div class="md:text-right" v-for="(sosmed, index) in sosmeds" :key="sosmed.id">
              <a :href="getSosmedUrl(sosmed)" class="text-black hover:text-blue-800 transition-colors duration-300">
                <i :class="[sosmed.logo, 'text-xl mx-2 transition-transform duration-300 transform hover:scale-110']"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mt-28">
      <p>Check out my Resume
      </p>
    </div>
      <div class="flex justify-center items-center mt-1">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 underline-animation">
          Resume
        </h2>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between mb-4 mt-10">
        <div class="mb-10 md:mb-0 md:ml-40"> <!-- Ubah margin right -->
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">Education</h2>
          <ol class="relative border-s border-gray-200 dark:border-gray-700">
            <li class="mb-10 ms-6" v-for="(education, index) in educations" :key="education.id">
              <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </span>
              <h3 class="mb-1 text-sm md:text-lg font-semibold text-gray-900 dark:text-white">{{ education.title }}</h3>
              <time class="block mb-2 text-sm md:text-lg font-normal leading-none text-gray-400 dark:text-gray-500">{{ education.place }} / {{ education.year }}</time>
              <p class="text-sm md:text-lg font-normal text-gray-500 dark:text-gray-400">{{ education.city }}</p>
            </li>
          </ol>
        </div>
        <div class="items-end mt-10 md:mt-0 md:mr-40"> <!-- Tambahkan margin left -->
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100">Experience</h2>
          <ol class="relative border-s border-gray-200 dark:border-gray-700">
            <li class="mb-10 ms-6" v-for="(experience, index) in experiences" :key="experience.id">
              <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </span>
              <h3 class="mb-1 text-sm md:text-lg font-semibold text-gray-900 dark:text-white">{{ experience.title }}</h3>
              <time class="block mb-2 text-sm md:text-lg font-normal leading-none text-gray-400 dark:text-gray-500"><a :href="experience.url" class="text-blue-600 dark:text-blue-400 hover:underline">{{ experience.place }}</a>
                / {{ experience.year }}</time>
              <p class="text-sm md:text-lg font-normal text-gray-500 dark:text-gray-400">{{ experience.city }}</p>
            </li>
          </ol>
        </div>
      </div>
      <div class="flex justify-center items-center mt-28">
        <p>My level of knowledge in some tools
        </p>
      </div>
        <div class="flex justify-center items-center mt-1">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100 underline-animation">
            My Skills
          </h2>
        </div>
        <div class="container grid grid-cols-4 md:grid-cols-4 gap-0 mt-10">
    <div class="mt-4 flex justify-center items-center relative group" v-for="(skill, index) in skills" :key="skill.id">
        <div class="relative inline-block group-hover:opacity-100">
            <div class="flex flex-col items-center">
                 <v-img :lazy-src="skill.image" loading="lazy" alt="Gambar kecil" class="w-12 h-12 transition-transform duration-300 transform hover:scale-110 lazyLoad" />
                <span class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-2 text-center bg-white bg-opacity-75 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{{ skill.description }}</span>
            </div>
        </div>
    </div>
</div></div>
  </div>
</template>

<script>
import Title from '@/components/title.vue';
export default {
  data() {
    return {
      biodatas: [],
      contacts: [],
      sosmeds: [],
      educations: [],
      experiences: [],
      skills: []
    };
  },
  async asyncData({ $axios }) {
    try {
      const [biodatasResponse, contactResponse, sosmedResponse, educationResponse, experienceResponse, skillResponse] = await Promise.all([
        $axios.get('/api/web/biodatas'),
        $axios.get('/api/web/contact'),
        $axios.get('/api/web/sosmeds'),
        $axios.get('/api/web/educations'),
        $axios.get('/api/web/experiences'),
        $axios.get('/api/web/skills')
      ]);

       // Mengurutkan data education dan experience berdasarkan id dari yang terbaru ke paling lama
       const educations = educationResponse.data.data.sort((a, b) => b.id - a.id);
      const experiences = experienceResponse.data.data.sort((a, b) => b.id - a.id);

      // Mengembalikan data sebagai objek yang akan digunakan di komponen
      return {
        biodatas: biodatasResponse.data.data,
        contacts: contactResponse.data.data,
        sosmeds: sosmedResponse.data.data,
        educations,
        experiences,
        skills: skillResponse.data.data
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      // Mengembalikan objek kosong jika terjadi error agar tidak ada kesalahan render
      return {
        biodatas: [],
        contacts: [],
        sosmeds: [],
        educations: [],
        experiences: [],
        skills: []
      };
    }
  },
  methods: {
    getSosmedUrl(sosmeds) {
      return `${sosmeds.url}/${sosmeds.username}`;
    }
  }
};

</script>

<style>
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

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.image-animation {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
