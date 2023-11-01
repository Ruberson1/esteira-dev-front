<script setup lang="ts">
import Chart from "chart.js/auto";
import { defineProps, onMounted, ref } from "vue";
import {inject, reactive} from "vue";
import Gateway from "../../infra/gateway/Gateway";
import DashList from "../../entity/DashList";


const canvasRef = ref<HTMLCanvasElement | null>(null);
const dashList: any = reactive(new DashList());

onMounted(async () => {
  try {
    const dataGateway = inject("dataGateway") as Gateway;

    const chartBarData = await dataGateway.getAll('bugs-dashboard');
    dashList.createDash(chartBarData);

  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }

  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dashList.dashs[0].data.names,
          datasets: [{
            label: '# of Bugs',
            data: dashList.dashs[0].data.counts,
            borderWidth: 2,
            borderColor: '#4338ca',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'rgb(0,191,255)'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
});
</script>

<template>
  <div class="sm:w-5/5 md:w-3/5 md:h-96 sm:h-6/6 lg:w-4/5 bg-gray-200 dark:bg-gray-900 overflow-hidden shadow-md shadow-cyan-500/50 sm:rounded-lg mr-1">
    <canvas class="dark:text-gray-100" ref="canvasRef" id="tasksBar" ></canvas>
  </div>
</template>

<style scoped>
</style>
