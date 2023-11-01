<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { formatDate } from '../../infra/shared/Utils';
import {onMounted, ref, inject, reactive} from "vue";
import Gateway from "../../infra/gateway/Gateway";
import StatusList from "../../entity/StatusList";
import UserList from "../../entity/UserList";
import { decrypt} from "../../infra/shared/Utils";

interface Status {
  id: number;
}
interface Dev {
  id: number;
}

const devs = ref([]);
const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
const status = ref([]);
const filters = ref<{ status_id: number[]; user_id: number[]; date_range?: string[]; title: string  }[]>([]);
const selectedStatus = ref<Status[] | null>(null);
const selectedDevs = ref<Dev[] | null>(null);
const dates = ref<Date[] | undefined>(undefined);
const searchTitle = ref('');
const statusList: any = reactive(new StatusList());
const userList: any = reactive(new UserList());
let dataGatewayPromise: any = null;

const manageFilters = () => {
  filters.value = [];

  if (selectedStatus.value) {
    const statusIds = selectedStatus.value.map(status => status.id);
    // @ts-ignore
    filters.value.push({ status_id: statusIds });
  }

  if (selectedDevs.value) {
    const devIds = selectedDevs.value.map(dev => dev.id);
    // @ts-ignore
    filters.value.push({ user_id: devIds });
  }

  if (searchTitle.value) {
    // @ts-ignore
    filters.value.push({ title: searchTitle.value});
  }

  if (dates.value !== undefined && dates.value.length === 2) {
    const formattedDates = [
      formatDate(dates.value[0]),
      formatDate(dates.value[1])
    ];
    // @ts-ignore
    filters.value.push({ task_date: formattedDates });
  }
};
const search = async () => {
  if(filters.value.length <= 0) {
    alert('Please select a search term')
    return;
  }
  sessionStorage.removeItem('url');
  sessionStorage.setItem('filters', JSON.stringify(filters.value));

  location.reload();
}

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
})
</script>


<template>
  <h5 class="text-2xl dark:text-gray-400 hidden md:block"> Search filter:</h5>
  <div class="mb-10 p-4 w-full bg-white border border-gray-200 rounded-lg shadow dark:shadow-cyan-400 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-2 pb-5">
      <div class="flex flex-wrap  justify-center mt-4">
        <Calendar @date-select="manageFilters()" showTime hourFormat="24" dateFormat="dd/mm/yy" v-model="dates"
                  class="w-full mb-6" placeholder="select range date" selectionMode="range" :manualInput="false" />
        <InputText  @keyup="manageFilters()" v-model="searchTitle" type="text" class="w-full mb-6 border rounded dark:bg-gray-800 dark:text-white"
                   size="large" placeholder="contain title task matching" />
        <MultiSelect v-if="master" @change="manageFilters()" v-model="selectedDevs" :options="userList.users" optionLabel="name" placeholder="Select Devs"
                      class="w-full mb-6 dark:text-gray-200 rounded dark:bg-gray-800 dark:text-white" />
        <MultiSelect @change="manageFilters()" v-model="selectedStatus" :options="statusList.statuses" optionLabel="name" placeholder="Select Status"
                      class="w-full mb-6 dark:text-gray-200" />
        <button @click="search()"  type="button" class=" w-full  justify-center cursor-pointer text-white flex bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700
      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg
      shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 mt-4">
        Search
        <svg class="w-5 h-5 pl-2 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>

</style>

