<script setup lang="ts">
import Chart from "chart.js/auto";
import { inject, onMounted, ref, reactive } from "vue";
import Gateway from "../../infra/gateway/Gateway";
import DashList from "../../entity/DashList";


const dashList: any = reactive(new DashList());
const canvasDoughRef = ref<HTMLCanvasElement | null>(null);
onMounted(async () => {
  try {
    const dataGateway = inject("dataGateway") as Gateway;

    const chartBarData = await dataGateway.getAll('tasks-dashboard');
    dashList.createDash(chartBarData);

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
  if (canvasDoughRef.value) {
    const ctx = canvasDoughRef.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            borderWidth: 0,
            data: dashList.dashs[0].data.status_count, // Aqui você deve usar os dados do seu chartDough
            backgroundColor: [
              '#a3e635',
              '#fbbf24',
              '#fca5a5',
              '#b91c1c',
              '#fbbf24',
              '#fde68a',
              '#4f46e5',
              '#22d3ee',
              '#65a30d',
              '#9f1239',
              '#0e7490'
            ]
          }],
          labels: dashList.dashs[0].data.status_name
        },
        options: {
          plugins: {
            legend: {
              position: 'left',
              display: true,
              labels: {
                color: 'rgb(0,191,255)',
                font:{
                  size: 8
                }
              }
            }
          },
        }
      });
    }
  }
});
</script>

<template>
  <div class="sm:w-5/5 md:w-2/5 h-96 lg:w-2/5 bg-gray-200 dark:bg-gray-900 overflow-hidden shadow-md shadow-cyan-500/50 sm:rounded-lg">
    <canvas class="dark:text-gray-100" ref="canvasDoughRef" id="tasksDoughnut" width="400" height="400"></canvas>
  </div>
</template>
