<script setup lang="ts">
import {defineProps, inject, onMounted, reactive, ref} from "vue";
import Gateway from "../../../infra/gateway/Gateway";
import BugList from "../../../entity/BugList";
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from "flowbite-vue";
import TaskStatusIndicator from "../TaskStatusIndicator.vue";
import router from "../../../drivers/router/app-router";
import swal from "sweetalert2";
import {useDark} from "@vueuse/core";
import {decrypt} from "../../../infra/shared/Utils";
import Image from "primevue/image";

const isDark = useDark()
const background = isDark.value ? '#1f2937' : '#fff';
const colorText = isDark.value ? '#9ca3af' : '#111827';
const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
const bugList: any = reactive(new BugList());
const { taskId } = defineProps(["taskId"]);
const linkImage = import.meta.env.VITE_APP_LINK_CLOUD_FRONT;
let dataGatewayPromise: any = null;

const goToFormBug = () => {
  router.push({ name: 'bug', params: { taskId: taskId }});
}
const editBug = (bugId: number) => {
  router.push({ name: 'bug', params: { bugId: bugId }});
}
const deleteBug = async (bugId: number) => {
  if (dataGatewayPromise) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      color: colorText,
      background: background,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) =>  {
      if (result.isConfirmed)  {
        try  {
          const dataGateway =  dataGatewayPromise;
          const bugData =  dataGateway.delete(`bug/${bugId}`);
          bugList.deleteBug(bugData);
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

onMounted(async ()  => {
  dataGatewayPromise = inject("dataGateway") as Promise<Gateway>;
  if (dataGatewayPromise) {
    try {
      const dataGateway = await dataGatewayPromise;
      const bugsData = await dataGateway.getById(`bug/task/${taskId}?&order_by=-created_at`);
      bugList.addBugs(bugsData);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
})
</script>

<template>
  <!-- Button Form Task -->
  <div class="flex justify-end mb-4 mt-4">
    <button v-if="master" @click="goToFormBug()" type="button" class="text-white flex bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg
    shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center
    mr-2 mb-2">
      New Bug
      <svg class="w-5 h-5 pl-2 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"/>
      </svg>
    </button>
  </div>
  <div v-if="bugList.bugs && bugList.bugs.length > 0">
    <Accordion>
      <accordion-panel v-for="(bug, index) in bugList.bugs" :key="index">
        <accordion-header class="flex items-center justify-between w-full  font-medium text-left">
          <div class="flex items-center justify-between w-full  font-medium text-left">
            <div class="px-5">
              <span :class="[!bug.production ? 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300'
              : 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300']"
                    class="inline-flex items-center justify-center w-20 text-sm font-medium">
                {{ !bug.production ? 'DEV' : 'PROD' }}
              </span>
            </div>
            <div class="hidden md:block px-5 text-gray-800 dark:text-gray-200">
              {{ bug.title }}
            </div>
            <div class="px-8 ">
              <TaskStatusIndicator :statusId="bug.category.id" :statusName="bug.category.name"/>
            </div>
          </div>
        </accordion-header>
        <accordion-content>
          <p class="text-center pb-10 font-bold md:text-4xl dark:text-gray-300 text-2xl">{{ bug.task.user.name }}</p>
          <div class="space-y-2 pl-4 p-6 border dark:bg-gray-800 border-gray-200 rounded-lg dark:border-gray-700 m-3">
            <div class="block flex">
              <span class="font-bold pr-4">Task:</span>
              <span class="text-center w-8 font-bold text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">#{{ bug.task.id }}</span>
            </div>
            <div class="block flex">
              <span class="font-bold block pr-4">Task title:</span>
              <span class="text-cyan-800 bg-cyan-100 rounded dark:bg-cyan-900 dark:text-cyan-300 w-72 text-center">{{ bug.task.title }}</span>
            </div>
            <div class="block flex">
              <span class="font-bold block pr-4">Task date:</span>
              <span class="text-cyan-800 bg-cyan-100 rounded dark:bg-cyan-900 dark:text-cyan-300 w-48 text-center">{{ bug.task.dev_date }}</span>
            </div>
          </div>
          <div class="divide-y divide-gray-600 space-y-2 pl-4 p-4 border border-gray-200 dark:bg-gray-800 rounded-lg dark:border-gray-700 m-3">
            <div>
              <p class="mb-3 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Tests</p>
            </div>
            <div class="pt-6 pb-6">
              {{ bug.tests }}
            </div>
          </div>
          <div class="divide-y divide-gray-600 space-y-2 pl-4 p-4 border border-gray-200 dark:bg-gray-800 rounded-lg dark:border-gray-700 m-3">
            <div>
              <p class="mb-3 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Description</p>
            </div>
            <div class="pt-6 pb-6" v-html="bug.description"></div>
          </div>
          <div  v-if="bug.image_bug.length > 0" class="divide-y dark:bg-gray-800 divide-gray-600 space-y-2 p-4 border border-gray-200 rounded-lg dark:border-gray-700 m-3">
            <div>
              <p class="mb-3 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">Images</p>
            </div>
            <div class="flex flex-wrap space-x-3">
              <div v-for="(image, index) in bug.image_bug" :key="index" class="pt-6 pb-6 flex">
                <Image :src="`${linkImage}${image.path}`"  alt="Image" width="250" preview />
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button v-if="master" @click="editBug(bug.id)" type="button" class="flex text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800
                      shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm
                      px-5 py-2.5 text-center mr-2 mb-2">
              Edit
              <svg class="ml-3 w-4 h-4 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
              </svg>
            </button>
            <button v-if="master" @click="deleteBug(bug.id)" type="button" class="flex text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600
                        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
                         shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm
                          px-5 py-2.5 text-center mr-2 mb-2">
              Delete
              <svg class="ml-3 w-4 h-4 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
              </svg>
            </button>
          </div>
        </accordion-content>
      </accordion-panel>
    </Accordion>
  </div>
  <!-- If bug list is empty -->
  <div v-else class="grid grid-rows-2 md:flex md:items-center md:justify-center ">
    <div class="md:w-1/2 justify-center flex items-center flex-col"> <!-- Add 'flex', 'items-center', and 'flex-col' classes -->
      <img src="../../../../public/images/empty.svg" alt="Imagem de erro" class="w-1/2 h-1/2 object-cover">
      <h1 class="text-2xl">Nenhum bug cadastrado</h1>
    </div>
  </div>

</template>

<style scoped>

</style>