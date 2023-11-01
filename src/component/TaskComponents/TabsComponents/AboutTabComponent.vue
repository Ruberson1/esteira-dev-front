<!--suppress TypeScriptUnresolvedReference -->
<script setup lang="ts">
import {defineProps, inject, reactive, ref} from "vue";
import router from "../../../drivers/router/app-router";
import Gateway from "../../../infra/gateway/Gateway";
import TaskList from "../../../entity/TaskList";
import swal from "sweetalert2";
import {useDark} from "@vueuse/core";
import {decrypt, formatDate} from "../../../infra/shared/Utils";
import Image from 'primevue/image';

const { task } = defineProps(["task"]);
const taskList: any = reactive(new TaskList());
const isDark = useDark()
const background = isDark.value ? '#1f2937' : '#fff';
const colorText = isDark.value ? '#9ca3af' : '#111827';
let dataGatewayPromise: any = null;
const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
const linkImage = import.meta.env.VITE_APP_LINK_CLOUD_FRONT;

dataGatewayPromise = inject("dataGateway") as Promise<Gateway>;

const editTask = (taskId: number) => {
  router.push({ name: 'task', params: { taskId: taskId }});
}
const deleteTask = async (taskId: number) => {
  if (dataGatewayPromise) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      color: colorText,
      background: background,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) =>  {
      if (result.isConfirmed)  {
        try {
          const dataGateway =  dataGatewayPromise;
          const taskData =  dataGateway.delete(`task/${taskId}`);
          taskList.deleteTask(taskData);
          setTimeout(() => {
            location.reload();
          }, 1500);
        } catch (error) {
          console.error("Error fetching dataGateway:", error);
        }
      }
    })
  }
}

const completionArrayDate = task.homolog_date ? task.homolog_date.split('/')[1] : task.homolog_date;
const requiredCompletionArrayDate = task.req_homolog_date ? task.req_homolog_date.split('/')[1] : task.req_homolog_date;
const delay = task.homolog_date > task.req_homolog_date || completionArrayDate > requiredCompletionArrayDate;
</script>

<template>
  <h2 class="mb-3 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{{ task.user.name }}</h2>
  <!-- status -->
  <div class="space-y-2 pl-4 p-6 border dark:bg-gray-900 border-gray-200 rounded-lg dark:border-gray-700 m-3">
    <div class="block flex">
      <span class="font-bold pr-4">Task:</span>
      <span class="text-center w-8 font-bold text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">{{ task.id }}</span>
    </div>
    <div v-if="task.homolog_date" class="block flex">
      <span class="font-bold block pr-4">Deadline:</span>
      <span :class="[ delay ? 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300' : 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300']" class="inline-flex items-center justify-center w-32 text-sm font-medium">
                        {{ delay ? 'DELIVERY DELAY' : 'DELIVERY ON TIME' }}</span>
    </div>
    <div class="block flex">
      <span class="font-bold block pr-4">Completion Required:</span>
      <span class="text-cyan-800 bg-cyan-100 rounded dark:bg-cyan-900 dark:text-cyan-300 w-44 text-center">{{ task.req_homolog_date }}</span>
    </div>
    <div v-if="task.homolog_date" class="block flex">
      <span class="font-bold block pr-4">Completion:</span>
      <span class="text-cyan-800 bg-cyan-100 rounded dark:bg-cyan-900 dark:text-cyan-300 w-44 text-center">{{ task.homolog_date }}</span>
    </div>
  </div>

  <!-- description -->

  <div class="divide-y divide-gray-600 space-y-2 pl-4 p-4 border border-gray-200 dark:bg-gray-900 rounded-lg dark:border-gray-700 m-3">
    <div>
      <p class="mb-3 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Description</p>
    </div>
    <div class="pt-6 pb-6" v-html="task.description"></div>
  </div>
  <div  v-if="task.task_image.length > 0" class="divide-y divide-gray-600 space-y-2 p-4 border border-gray-200 rounded-lg dark:border-gray-700 m-3">
    <div>
      <p class="mb-3 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Images</p>
    </div>
    <div class="flex flex-wrap space-x-3">
      <div v-for="(image, index) in task.task_image" :key="index" class="pt-6 pb-6 flex">
        <Image :src="`${linkImage}${image.path}`"  alt="Image" width="250" preview />
      </div>
    </div>
  </div>
  <div class="flex justify-end m-2">
    <button @click="editTask(task.id)" type="button" class="flex text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
                      shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm
                      px-5 py-2.5 text-center mr-2 mb-2">
      Edit
      <svg class="ml-3 w-4 h-4 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
      </svg>
    </button>
    <button v-if="master" @click="deleteTask(task.id)" type="button" class="flex text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600
                        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
                         shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm
                          px-5 py-2.5 text-center mr-2 mb-2">
      Delete
      <svg class="ml-3 w-4 h-4 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
      </svg>
    </button>
  </div>
</template>