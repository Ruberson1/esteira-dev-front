<script setup lang="ts">
import Chart from "chart.js/auto";
import { inject, reactive, onMounted } from "vue";
import Gateway from "../../infra/gateway/Gateway";
import DashList from "../../entity/DashList";


const dashList: any = reactive(new DashList());
onMounted( async () => {
  try {
    const dataGateway = inject("dataGateway") as Gateway;

    const chartBarData = await dataGateway.getAll('dashboard-line');
    dashList.createDash(chartBarData);

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
  const ctx = document.getElementById('tasksLine') as HTMLCanvasElement;
  const labels = dashList.dashs[0].data.month_name;
  const data = {
    labels: labels,
    datasets: [{
      label: 'tasks per period',
      data: dashList.dashs[0].data.task_count,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  new Chart(ctx, {
    type: 'line',
    data: data
  });
});
</script>

<template>
  <div class="w-full sm:h-5/6 md:h-80 bg-gray-200 dark:bg-gray-900 overflow-hidden shadow-md shadow-cyan-500/50 sm:rounded-lg">
    <canvas class="dark:text-gray-100" id="tasksLine" width="1900" height="600"></canvas>
  </div>
</template>

<style scoped>
/* Seus estilos aqui */
</style>
