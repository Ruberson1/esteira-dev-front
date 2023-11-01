<script setup lang="ts">
import TaskStatusIndicator from "../TaskStatusIndicator.vue";
import {defineProps, inject, onMounted, reactive, ref} from "vue";
import HistoryList from "../../../entity/HistoryList";
import Gateway from "../../../infra/gateway/Gateway";

const historyList: any = reactive(new HistoryList());
const { taskId } = defineProps(["taskId"]);
let dataGatewayPromise: any = null;
const linkImage = import.meta.env.VITE_APP_LINK_CLOUD_FRONT;

onMounted(async ()  => {
  dataGatewayPromise = inject("dataGateway") as Promise<Gateway>;
  if (dataGatewayPromise) {
    try {
      const dataGateway = await dataGatewayPromise;
      const historiesData = await dataGateway.getById(`history/task/${taskId}?&order_by=-history_date`);
      historyList.addHistories(historiesData);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
})
</script>

<template>
  <!-- component -->
  <div v-if="historyList.histories && historyList.histories.length > 0">
    <div class="hidden md:flex justify-center items-center bg-gray-200 dark:bg-gray-900 rounded-md">
      <div class="col-span-6">
        <div class="overflow-auto lg:overflow-visible ">
          <table class="table dark:text-gray-400 border-separate space-y-6 text-sm">
            <thead class="bg-white dark:bg-gray-800">
              <tr>
                <th class="p-4">User</th>
                <th class="p-3 text-left">Status</th>
                <th class="p-3 text-left">Task</th>
                <th class="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white dark:bg-gray-800 shadow dark:shadow-cyan-500/50 " v-for="(h, index) in historyList.histories" :key="index" >
                <td class="p-3">
                  <div class="flex align-items-center">
                    <img class="rounded-full h-12 w-12  object-cover" :src="`${linkImage}${h.user.image.path}`" alt="unsplash image">
                    <div class="ml-3">
                      <div class="">{{ h.user.name }}</div>
                      <div class="text-gray-500">{{ h.user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="p-2">
                  <TaskStatusIndicator :statusId="h.status.id" :statusName="h.status.name"/>
                </td>
                <td class="p-2 font-bold">
                  {{ h.task.title }}
                </td>
                <td class="p-2">
                  {{ h.history_date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- HISTÓRICO CARDS  MOBILE VIEW          -->

    <div  class="grid grid-cols-1 md:hidden sm:grid-cols-2 gap-4 " >
      <div v-for="(h, index) in historyList.histories" :key="index" class="bg-white dark:bg-gray-800 space-y-3 p-4 rounded-lg shadow dark:shadow-cyan-500/50">
        <div class="flex items-center space-x-8 text-sm">
          <div class="text-gray-500 dark:text-cyan-300">{{ h.user.name }}</div>
          <div>
            <TaskStatusIndicator :statusId="h.status.id" :statusName="h.status.name"/>
          </div>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-50">
          {{ h.task.title }}
        </div>
        <div class="text-sm font-medium dark:text-cyan-300 text-black">
          {{ h.history_date }}
        </div>
      </div>
    </div>
  </div>

  <div v-else class="grid grid-rows-2 md:flex md:items-center md:justify-center ">
    <div class="md:w-1/2 justify-center flex items-center flex-col"> <!-- Add 'flex', 'items-center', and 'flex-col' classes -->
      <img src="../../../../public/images/empty.svg" alt="Imagem de erro" class="w-1/2 h-1/2 object-cover">
      <h1 class="text-2xl">No registered history</h1>
    </div>
  </div>

</template>

<style scoped>
.table {
  border-spacing: 0 12px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n+4),
tr th:nth-child(n+4) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}
</style>