<template>
  <div></div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: null,
      image: null,
      description: null
    };
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('/api/web/headers');
      const data = response.data;
      const defaultTitle = data && data.length > 0 ? data[0].title : null;
      const defaultImage = data && data.length > 0 ? data[0].image : null;
      const defaultDescription = data && data.length > 0 ? data[0].description : null;

      return {
        title: defaultTitle,
        image: defaultImage,
        description: defaultDescription
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        title: null,
        image: null,
        description: null
      };
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.$get('/api/web/headers');
        const data = response.data;
        this.title = data && data.length > 0 ? data[0].title || this.pageTitle : this.pageTitle;
        this.image = data && data.length > 0 ? data[0].image : null;
        this.description = data && data.length > 0 ? data[0].description : null;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.title = this.pageTitle;
      }
      this.updateDocumentHead();
    },
    updateDocumentHead() {
      if (process.client) {
        document.title = `${this.pageTitle} - ${this.title || ''}`;

        // Update meta tags
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', this.description || '');
        } else {
          const newMetaDescription = document.createElement('meta');
          newMetaDescription.name = 'description';
          newMetaDescription.content = this.description || '';
          document.head.appendChild(newMetaDescription);
        }

        // Update favicon
        const linkIcon = document.querySelector('link[rel="icon"]');
        if (linkIcon) {
          linkIcon.setAttribute('href', this.image || '/default-icon.png');
        } else {
          const newLinkIcon = document.createElement('link');
          newLinkIcon.rel = 'icon';
          newLinkIcon.href = this.image || '/default-icon.png';
          document.head.appendChild(newLinkIcon);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Add CSS styles if needed */
</style>
