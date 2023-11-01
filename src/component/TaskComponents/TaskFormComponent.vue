<script setup lang="ts">
import Editor from 'primevue/editor';
import Calendar from 'primevue/calendar';
import {computed, inject, onMounted, reactive, ref} from "vue";
import Gateway from "../../infra/gateway/Gateway";
import StatusList from "../../entity/StatusList";
import UserList from "../../entity/UserList";
import TaskList from "../../entity/TaskList";
import {decrypt, formatDate} from '../../infra/shared/Utils';
import router from "../../drivers/router/app-router";
import Dropdown from 'primevue/dropdown';
import {useRoute} from "vue-router";
import Image from "primevue/image";

let dataGatewayPromise: any = null;
const statusList: any = reactive(new StatusList());
const userList: any = reactive(new UserList());
const taskList: any = reactive(new TaskList());
const userSelected: any = ref([]);
const statusSelected: any = ref();
const completionRequired = ref();
const completion = ref();
const title = ref('');
const description = ref('');
const selectedFiles = ref();
const route = useRoute();
const taskId = route.params.taskId;
const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
const isEmpty = computed(() => {
  return title.value === '' || description.value === '' || statusSelected.value === undefined || userSelected.value === undefined;
});


const submitForm = async () => {
  if(!master.value) {
    alert("You don't have permission for this action.");
    return;
  }
  const user  = userSelected.value;
  const status = statusSelected.value;
  const formData = new FormData();
  formData.append('user_id', user.id);
  formData.append('status_id', status.id);
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('req_homolog_date', formatDate(completionRequired.value));

  if(selectedFiles.value !== undefined) {
    selectedFiles.value.forEach((file: any) => {
      formData.append('files[]', file.file);
    });
  }

  if (dataGatewayPromise) {
    try {
      const dataGateway = dataGatewayPromise;
      const taskData = dataGateway.create('task', formData);
      taskList.createTask(taskData);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
}
const updateForm = async () => {
  const user  = userSelected.value;
  const status = statusSelected.value;
  if (loggedUser.id !== user.id && !master.value) {
    alert("You don't have permission for this action.")
    return;
  }

  if(status.id == import.meta.env.VITE_APP_STATUS_AG_MERGE) {
    completion.value = new Date();
  }
  const formData = new FormData();
  // @ts-ignore
  formData.append('id', taskId);
  formData.append('user_id', user.id);
  formData.append('status_id', status.id);
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('req_homolog_date', formatDate(completionRequired.value));

  if(completion.value !== null) {
    formData.append('homolog_date', formatDate(completion.value));
  }

  if(selectedFiles.value !== undefined) {
    selectedFiles.value.forEach((file: any) => {
      formData.append('files[]', file.file);
    });
  }
  if (dataGatewayPromise) {
    try {
      const dataGateway =  dataGatewayPromise;
      const taskData =  dataGateway.create(`update-task`, formData);
      taskList.createTask(taskData);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
}

const getTask = ( async (taskId: string) => {
  try {
    const dataGateway = await dataGatewayPromise;
    const taskData = await dataGateway.getById(`task/${taskId}`);
    taskList.addTasks(taskData);
  } catch (error) {
    console.error("Error fetching dataGateway:", error);
  }
  userSelected.value = taskList.tasks[0].user;
  statusSelected.value = taskList.tasks[0].status;
  completionRequired.value = taskList.tasks[0].req_homolog_date;
  completion.value = taskList.tasks[0].homolog_date;
  title.value = taskList.tasks[0].title;
  description.value = taskList.tasks[0].description;
})

onMounted(async () => {
  dataGatewayPromise = inject("dataGateway") as Promise<Gateway>;
  if (dataGatewayPromise) {
    try {
      const dataGateway = await dataGatewayPromise;
      const statusData = await dataGateway.getAll('status?&limit=12');
      const usersData = await dataGateway.getAll('users');
      statusList.addStatus(statusData);
      userList.addUsers(usersData);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
  if (taskId) {
    if (typeof taskId === "string") {
      await getTask(taskId);
    }
  }
})
const handleFileChange = (event: any) => {
  const files = Array.from(event.target.files);
  selectedFiles.value = files.map((file: any) => ({
    name: file.name,
    size: file.size,
    type: file.type,
    preview: URL.createObjectURL(file),
    file: file,
  }));
};
</script>

<template>
  <div class="mx-auto sm:block md:w-1/2">
    <form @submit.prevent="">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div >
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a user</label>
          <Dropdown :disabled="!master" v-model="userSelected" :options="userList.users"
                    optionLabel="name"  class="p-inputtext-sm md:w-14rem" />
        </div>

        <div>
          <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a status</label>
          <Dropdown v-model="statusSelected" :options="statusList.statuses"
                    optionLabel="name"  class="p-inputtext-sm md:w-14rem" />
        </div>
        <div>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Completion required</label>
          <div class="card flex justify-content-center">
            <Calendar :disabled="!master" class="w-full" showTime hourFormat="24" placeholder="select required date" v-model="completionRequired" />
          </div>
        </div>
        <div>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Completion</label>
          <div class="card flex justify-content-center">
            <Calendar disabled class="w-full" showTime hourFormat="24" placeholder="select completion date" v-model="completion" />
          </div>
        </div>
      </div>
      <div class="mb-6" v-if="master">
        <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task title</label>
        <input v-model="title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Write your title here..." required>
      </div>
      <div class="mb-6" v-if="master">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task description</label>
        <div class="card dark:bg-gray-900">
          <Editor  v-model="description" editorStyle="height: 320px">
            <template v-slot:toolbar>
              <span class="ql-formats">
                  <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                  <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                  <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
              </span>
            </template>
          </Editor>
        </div>
      </div>
      <div class="mb-6" v-if="master">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task image</label>
        <div class="flex items-center justify-center w-full">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300
         border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100
         dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden"  @change="handleFileChange" multiple/>
          </label>
        </div>
      </div>
      <div v-if="selectedFiles" class="mb-20 w-full shadow-md shadow-cyan-500/50  p-6 bg-gray-200 dark:bg-gray-900 border border-gray-200 rounded-lg dark:shadow-md dark:shadow-cyan-500/50  hover:hover:shadow-cyan-500/50 dark:shadow-md dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-cyan-500/50">
        <div class="flex flex-wrap justify-center">
          <template v-for="(file, index) in selectedFiles" :key="index">
            <div
                class="flex justify-center items-center m-2"
                :class="{ 'w-full': selectedFiles.length === 1 && index === 0 }"
            >
              <Image
                  :src="file.preview"
                  alt="Image"
                  width="250"
                  preview
              />
            </div>
          </template>
        </div>
      </div>
      <div class="mb-16">
        <a v-if="taskId" @click="updateForm()" type="submit" class="cursor-pointer w-full text-white flex items-center justify-center bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600
          hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg
          shadow-amber-500/50 dark:shadow-lg dark:shadow-amber-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center
          mr-2 mb-2">
          Update Task
          <svg class="w-4 h-4 ml-2 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m14.707 4.793-4-4a1 1 0 0 0-1.416 0l-4 4a1 1 0 1 0 1.416 1.414L9 3.914V12.5a1 1 0 0 0 2 0V3.914l2.293 2.293a1 1 0 0 0 1.414-1.414Z"/>
            <path d="M18 12h-5v.5a3 3 0 0 1-6 0V12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
          </svg>
        </a>
        <button :disabled="isEmpty" v-else @click="submitForm()" :class="[ isEmpty ? 'cursor-not-allowed': 'cursor-pointer']" type="submit" class=" w-full text-white flex items-center justify-center bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
          hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg
          shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center
          mr-2 mb-2">
          Register Task
          <svg class="w-4 h-4 ml-2 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m14.707 4.793-4-4a1 1 0 0 0-1.416 0l-4 4a1 1 0 1 0 1.416 1.414L9 3.914V12.5a1 1 0 0 0 2 0V3.914l2.293 2.293a1 1 0 0 0 1.414-1.414Z"/>
            <path d="M18 12h-5v.5a3 3 0 0 1-6 0V12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>