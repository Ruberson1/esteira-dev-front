<script setup lang="ts">
import {defineProps, inject, onMounted, ref} from 'vue';
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'flowbite-vue'
import TaskStatusIndicator from './TaskStatusIndicator.vue';
import AboutTabComponent from "./TabsComponents/AboutTabComponent.vue";
import HistoryTabComponent from "./TabsComponents/HistoryTabComponent.vue";
import BugTabComponent from "./TabsComponents/BugTabComponent.vue";
import TaskFilterComponent from "./TaskFilterComponent.vue";
import router from "../../drivers/router/app-router";
import Gateway from "../../infra/gateway/Gateway";
import {decrypt} from "../../infra/shared/Utils";


const { taskList } = defineProps(["taskList"]);
const activeTabs = ref<Record<number, string>>({});
const openFilter = ref(false);
const linkImage = 'https://d3rusw38jvfggp.cloudfront.net/';
const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
let dataGatewayPromise: any = null;
const activateTab = (index: number, tab: string) => {
  activeTabs.value = { ...activeTabs.value, [index]: tab };
};
const toggleFilter = () => {
  openFilter.value = !openFilter.value;
}
const toggleTransfer = async (taskId: number, isTransfer: boolean) => {
  isTransfer = !isTransfer;
  if (dataGatewayPromise) {
    try {
      const dataGateway = await dataGatewayPromise;
      const taskData = await dataGateway.update(`task/${taskId}`, {transfer: isTransfer});
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
}
const clearFilter = () => {
  const getFilters = sessionStorage.getItem('filters');
  if(getFilters === null || getFilters === undefined) {
    alert('No filters')
    return;
  }
  sessionStorage.removeItem('filters')
  location.reload();
}

onMounted(() => dataGatewayPromise = inject("dataGateway") as Promise<Gateway>)
</script>


<template>
  <!-- Task menu -->
  <div class="flex justify-end mb-4 mt-4">
    <div v-tooltip.top="'Open filter'" class="cursor-pointer" @click="toggleFilter">
      <svg  class="w-6 h-6 text-gray-800 mr-6 mt-2 dark:text-cyan-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"/>
      </svg>
    </div>
    <div v-tooltip.top="'Clear filter'" class="cursor-pointer" @click="clearFilter">
      <svg class="w-6 h-6 text-red-500 mr-6 mt-2 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
    </div>
    <a v-if="master" href="/task" type="button" class="text-white flex bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg
    shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center
    mr-2 mb-2">
      New Task
      <svg class="w-5 h-5 pl-2 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"/>
      </svg>
    </a>
  </div>
  <!-- Task List -->
  <div class="flex flex-col-reverse md:flex-row">
    <div class="flex-1">
      <div v-if="taskList.tasks && taskList.tasks.length > 0">
        <Accordion >
          <accordion-panel v-for="(task, index) in taskList.tasks" :key="index" >
            <accordion-header >
              <div class="flex items-center justify-between w-full  font-medium text-left">
                <div class="px-5">
                  <img v-if="task.user.image !== null" class="inline-block h-[2.875rem] w-[2.875rem] rounded-md ring-2 ring-white dark:ring-gray-800"
                       :src="`${linkImage}${task.user.image.path}`"
                       alt="Image Description">
                </div>
                <div class="px-5 hidden md:block  text-gray-800 dark:text-gray-200">
                  {{ task.title }}
                </div>
                <div @click="toggleTransfer(task.id, task.transfer)" v-if="master" class="flex items-center justify-center block shadow-md shadow-cyan-500/50 p-1.5  max-w-sm  bg-gray-200 dark:bg-gray-900
                   border border-gray-200 rounded-lg dark:shadow-md dark:shadow-cyan-500/50  hover:hover:shadow-cyan-500/50
                   dark:shadow-md dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-cyan-500/50">
                  <svg v-if="task.transfer"  class="w-5 h-5 m-0.5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                  </svg>
                  <svg v-else class="w-5 h-5 m-0.5 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z"/>
                  </svg>
                </div>
                <div class="px-8 flex ">
                  <TaskStatusIndicator :statusId="task.status.id" :statusName="task.status.name"/>
                </div>
              </div>
            </accordion-header>
            <accordion-content>
              <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                  <li class="mr-2">
                    <button @click="() => activateTab(index, 'about')" id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about"
                            aria-selected="true" class="inline-block p-4  rounded-tl-lg hover:bg-gray-100
                      dark:bg-gray-800 dark:hover:bg-gray-700 " :class="{'dark:text-cyan-500 text-amber-500' : activeTabs[index] === 'about' || !activeTabs[index]}">About</button>
                  </li>
                  <li class="mr-2">
                    <button @click="() => activateTab(index, 'history')" id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services"
                            aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700
                       dark:hover:text-gray-300" :class="{'dark:text-cyan-500 text-amber-500' : activeTabs[index] === 'history'}">History</button>
                  </li>
                  <li class="mr-2">
                    <button @click="() => activateTab(index, 'bugs')" id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics"
                            aria-selected="false" class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700
                      dark:hover:text-gray-300" :class="{'dark:text-cyan-500 text-amber-500' : activeTabs[index] === 'bugs'}">Bugs</button>
                  </li>
                </ul>
                <div id="defaultTabContent">
                  <!-- About Tab -->
                  <div v-if="activeTabs[index] === 'about' || !activeTabs[index]" class=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <AboutTabComponent :task="task"/>
                  </div>
                </div>
                <!--  History Tab  -->
                <div v-if="activeTabs[index] === 'history'" class=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="history-tab">
                  <HistoryTabComponent :taskId="task.id" />
                </div>
                <!--  Bugs Tab  -->
                <div v-if="activeTabs[index] === 'bugs'" class=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="statistics" role="tabpanel" aria-labelledby="bugs-tab">
                  <BugTabComponent :taskId="task.id"/>
                </div>
              </div>
            </accordion-content>
          </accordion-panel>
        </Accordion>
      </div>
      <!-- If task list is empty -->
      <div v-else class="grid grid-rows-2 md:flex md:items-center md:justify-center md:h-screen">
        <div class="md:w-1/2 justify-center flex items-center flex-col"> <!-- Add 'flex', 'items-center', and 'flex-col' classes -->
          <img src="../../../public/images/empty.svg" alt="Imagem de erro" class="w-1/2 h-1/2 object-cover">
          <h1 class="text-2xl">Não existem tasks cadastradas</h1>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-4" v-if="openFilter" >
      <TaskFilterComponent  />
    </div>
  </div>
</template>

<style>

</style>

