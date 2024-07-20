<template>
  <div class="bg-white h-screen flex items-center justify-center px-4">
    <Title :pageTitle="'Home'" />
    <div class="text-xl md:text-4xl font-bold text-gray-800 opacity-0 animate-fade-in animation-delay-300 transition-opacity">
      Welcome (Inggris)
    </div>
  </div>
</template>

<script>
import Title from '@/components/title.vue';
export default {
  data() {
    return {
      words: [
  'Selamat Datang (Indonesia)',
  'Hello (Inggris)',
  'Bonjour (Prancis)',
  'Hola (Spanyol)',
  'Ciao (Italia)',
  'Namaste (India, Nepal)',
  'Welcome (Inggris)',
  'Konnichiwa (Jepang)',
  'Salam (Arab)',
  'Sawubona (Zulu, Afrika Selatan)',
  'Sveiki atvykę (Lituania)',
  'Merhaba (Turki)',
  'Hoi (Belanda)',
  'Bem-vindo (Portugis, Brasil)',
  'Mingalaba (Myanmar, Burma)',
  'Sannu (Hausa, Nigeria)',
  'Dobrodošli (Kroasia)',
  'Talofa (Samoa)',
  'Salve (Latin)',
  'Kia ora (Maori, Selandia Baru)',
  'Sveiki (Latvia)',
  'Huan ying (Tionghoa, Mandarin)',
  'Yōkoso (Jepang)',
  'Benvinguts (Katalan, Spanyol)',
  'Benvenuto (Italia)',
  'Üdvözöljük (Hungaria)',
  'Välkommen (Swedia)',
  'Velkommen (Denmark)',
  'Velkomin (Islandia)',
  'Vítejte (Ceko)',
  'Tervetuloa (Finlandia)',
  'Hoş geldiniz (Turki)',
  'Witajcie (Polandia)',
  'Bine ai venit (Rumania)',
  'Добро пожаловать (Rusia)',
  '歡迎 (Tionghoa, Tradisional)',
  '환영합니다 (Korea)',
  'خوش آمدید (Persia, Farsi)',
  'स्वागत हे (Hindi)',
  'ಸುಸ್ವಾಗತ (Kannada, India)',
  'வரவேற்கிறேன் (Tamil, India)',
  'స్వాగతం (Telugu, India)',
  'സ്വാഗതം (Malayalam, India)',
  'សូមស្វាគមន៍ (Khmer, Kamboja)',
  'ຍິນດີຕ້ອນຮັບ (Laos)',
  'ကြိုဆိုပါတယ် (Myanmar, Burma)',
  'Сайн уу (Mongolia)',
  'Բարի գալուստ (Armenia)',
  'ברוך הבא (Ibrani)',
  'እንቋቋም (Amharik, Ethiopia)',
  'Croeso (Wales, Inggris)',
  'Üdvözöljük (Hungaria)',
  'Hosgeldiniz (Turki)',
  'Velkommen (Norwegia)',
  'Maligayang Pagdating (Filipina)',
  'Selamat Datang (Malaysia)',
  'Vítejte (Ceko)',
  'Välkommen (Swedia)',
  '歡迎 (Tionghoa, Tradisional)',
  '환영 (Korea)',
  'Benvinguts (Katalan, Spanyol)',
  'Bem-vindo (Portugis, Brasil)',
  'Benvenuto (Italia)',
  'Kia ora (Maori, Selandia Baru)',
  'Sveiki (Latvia)',
  'Yōkoso (Jepang)',
      ],
      currentIndex: 0
    };
  },
  mounted() {
    const element = document.querySelector('.animate-fade-in');
    this.animateWords(element);
  },
  methods: {
    animateWords(element) {
      let delay = 300;
      setInterval(() => {
        const word = this.words[this.currentIndex];
        element.classList.add('opacity-0'); // Fading out

        setTimeout(() => {
          element.textContent = word;
          element.classList.remove('opacity-0'); // Fading in
        }, 500); // Delay before fading in

        // Increase index for the next word
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
      }, 500); // Interval between words
    }
  }
};
</script>

<style scoped>
/* Custom styles */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}
</style>
