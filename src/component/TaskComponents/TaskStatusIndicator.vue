<!-- TaskStatusIndicator.vue -->
<template>
  <span :class="statusClass" class="inline-flex items-center justify-center md:w-40 text-sm font-medium space-x-6">
    {{ props.statusName }}
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  statusId: {
    type: Number,
    required: true,
  },
  statusName: {
    type: String,
    required: true,
  },
});



const statusClass = computed(() => {
  switch (props.statusId) {
    case 1:
      return 'text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-300';
    case 2:
      return 'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300';
    case 3:
      return 'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300';
    case 4:
      return 'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300';
    case 5:
      return 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300';
    case 6:
      return 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300';
    case 7:
      return 'text-fuchsia-800 bg-fuchsia-100 rounded dark:bg-fuchsia-900 dark:text-fuchsia-300';
    case 8:
      return 'text-gray-800 bg-gray-100 rounded dark:bg-rose-900 dark:text-rose-300';
    case 9:
      return 'text-slate-800 bg-slate-100 rounded dark:bg-slate-900 dark:text-slate-300';
    case 10:
      return 'text-rose-800 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300';
    case 11:
      return 'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300';
    default:
      return '';
  }
});
</script>
