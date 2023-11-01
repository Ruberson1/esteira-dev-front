<script setup lang="ts">
import { defineProps } from "vue/dist/vue";

const GoToPage = (url: string) => {
  const endpoint = extractEndpoint(url);
  sessionStorage.removeItem('url');
  sessionStorage.setItem('url', endpoint);
  location.reload();
};
const extractEndpoint = (url: string) => {
  const lastSlashIndex = url.lastIndexOf('/');
  if (lastSlashIndex !== -1) {
    return url.substr(lastSlashIndex + 1);
  }
  return url;
};
const emit = defineEmits();
const { pagination } = defineProps(["pagination"]);
</script>

<template>
  <div v-for="page in pagination.paginations" class="flex flex-col items-center mb-16 pt-10">
    <!-- Help text -->
    <span class="text-sm text-gray-700 dark:text-gray-400">
             Showing <span class="font-semibold text-gray-900 dark:text-white">{{ page.from }}</span> to
            <span class="font-semibold text-gray-900 dark:text-white">{{ page.to }}</span> of <span class="font-semibold
             text-gray-900 dark:text-white">{{ page.total }}</span> Entries
          </span>
    <!-- Buttons -->
    <div class="inline-flex mt-2 xs:mt-0">
      <button @click="GoToPage(page.prev_page_url)" :disabled="page.current_page == 1" :class="{'cursor-not-allowed disabled' : page.current_page == 1}" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Prev
      </button>
      <button @click="GoToPage(page.next_page_url)" :disabled="page.current_page == page.last_page" :class="{'cursor-not-allowed disabled' : page.current_page == page.last_page}" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>