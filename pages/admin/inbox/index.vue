<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Inbox</h1>
    <Title :pageTitle="'Inbox'" />
    <div class="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <input v-model="search" @input="searchData" type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Subject</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inbox in filteredInboxes" :key="inbox.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ inbox.name }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ inbox.email }}</td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ inbox.subject }}</td>
            <td :class="{
              'px-6 py-4 font-medium whitespace-nowrap text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900': inbox.status === 'pending',
              'px-6 py-4 font-medium whitespace-nowrap text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900': inbox.status === 'read'
            }">
              {{ inbox.status }}
            </td>
            <td class="px-9 py-4 flex space-x-4">
              <button @click="viewInbox(inbox.id)" class="text-blue-600 dark:text-blue-500 hover:underline">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
              </button>
              <a href="#" @click.prevent="deleteInbox(inbox.id)" class="text-red-600 dark:text-red-500 hover:underline">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="flex items-center flex-wrap md:flex-row justify-between pt-4 md:pb-20" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.from }}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.to }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span></span>
      <ul class="inline-flex -space-x-px text-sm h-8">
        <li>
          <button @click.prevent="changePage(pagination.current_page - 1)" :disabled="!pagination.prev_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
        </li>
        <li v-for="page in pagination.last_page" :key="page">
          <button @click.prevent="changePage(page)" :class="{'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white': page === pagination.current_page, 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== pagination.current_page}" class="flex items-center justify-center px-3 h-8 leading-tight border">
            {{ page }}
          </button>
        </li>
        <li>
          <button @click.prevent="changePage(pagination.current_page + 1)" :disabled="!pagination.next_page_url" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
        </li>
      </ul>
    </nav>

   <!-- Modal -->
<div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
  <!-- Overlay background -->
  <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>

  <!-- Modal content -->
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 z-50 w-150 max-w-150 overflow-y-auto shadow-lg relative">

    <!-- Close button with icon -->
    <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 9l4.586-4.586a1 1 0 111.414 1.414L11.414 10l4.586 4.586a1 1 0 01-1.414 1.414L10 11.414l-4.586 4.586a1 1 0 01-1.414-1.414L8.586 10 4 5.414A1 1 0 015.414 4L10 8.586z" clip-rule="evenodd"></path>
      </svg>
    </button>

    <!-- Details -->
    <div class="mb-4 text-gray-900 dark:text-gray-100">
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <p class="text-gray-900 dark:text-gray-100"><strong>Name:</strong> {{ selectedInbox ? selectedInbox.name : 'N/A' }}</p>
      </div>
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
        </svg>
        <p class="text-gray-900 dark:text-gray-100"><strong>Email:</strong> {{ selectedInbox ? selectedInbox.email : 'N/A' }}</p>
      </div>
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"/>
        </svg>
        <p class="text-gray-900 dark:text-gray-100"><strong>Subject:</strong> {{ selectedInbox ? selectedInbox.subject : 'N/A' }}</p>
      </div>
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clip-rule="evenodd"/>
        </svg>
        <p class="text-gray-900 dark:text-gray-100"><strong>Message:</strong> {{ selectedInbox ? selectedInbox.message : 'N/A' }}</p>
      </div>
      <div class="flex items-center mb-2">
        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.5 11.5 2.071 1.994M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L10 17Zm-5 3h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
        </svg>
        <p class="text-gray-900 dark:text-gray-100"><strong>Date:</strong> {{ selectedInbox ? new Date(selectedInbox.created_at).toLocaleString() : 'N/A' }}</p>
      </div>
      <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
    </div>
  </div>
</div>

    <!-- Close button -->




  </div>
</template>


<script>
import Title from '@/components/title.vue';
export default {
  layout: 'admin',
  data() {
    return {
      search: '',
      filteredInboxes: [],
      pagination: {},
      showModal: false,
      selectedInbox: null
    };
  },
  async asyncData({ $axios, query }) {
    const search = query.q || '';
    const page = query.page || 1;

    try {
      const response = await $axios.$get(`/api/admin/inboxes?q=${search}&page=${page}`);
      return {
        filteredInboxes: response.data.data,
        pagination: response.data,
        search
      };
    } catch (error) {
      console.error('Error fetching Inbox:', error);
      return {
        filteredInboxes: [],
        pagination: {},
        search
      };
    }
  },
  methods: {
  async fetchInbox() {
    try {
      const response = await this.$axios.$get(`/api/admin/inboxes?q=${this.search}`);
      this.filteredInboxes = response.data.data;
      this.pagination = response.data;
    } catch (error) {
      console.error('Error fetching Inbox:', error);
    }
  },
  async deleteInbox(id) {
    try {
      const confirmed = await this.$swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this Inbox.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (confirmed.isConfirmed) {
        await this.$axios.delete(`/api/admin/inboxes/${id}`);
        await this.fetchInbox();
        await this.$swal.fire({
          title: 'Deleted!',
          text: 'The Inbox has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      console.error('Error deleting Inbox:', error);
      this.$swal.fire({
        title: 'Error',
        text: 'Failed to delete Inbox.',
        icon: 'error',
        timer: 2000
      });
    }
  },
  async changePage(page) {
    try {
      const response = await this.$axios.$get(`/api/admin/inboxes?q=${this.search}&page=${page}`);
      this.filteredInboxes = response.data.data;
      this.pagination = response.data;
      this.$router.push({ path: this.$route.path, query: { q: this.search, page: page } });
    } catch (error) {
      console.error('Error changing page:', error);
    }
  },
  searchData() {
    this.fetchInbox();
  },
  async viewInbox(id) {
    try {
      // Update status to 'read'
      await this.$axios.put(`/api/admin/inboxes/${id}/read`);

      // Fetch the updated inbox details
      const response = await this.$axios.$get(`/api/admin/inboxes/${id}`);
      this.selectedInbox = response.data;
      this.showModal = true;

      // Refresh inbox list
      await this.fetchInbox();
    } catch (error) {
      console.error('Error fetching Inbox:', error);
    }
  },
  closeModal() {
    this.showModal = false;
    this.selectedInbox = null;
  }
}
}
</script>



<style scoped>
/* Add scoped styles if needed */
</style>
