<script setup lang="ts">
import LineChartComponent from "../component/DashboardComponents/LineChartComponent.vue";
import BarChartComponent from "../component/DashboardComponents/BarChartComponent.vue";
import DoughnutChartComponent from "../component/DashboardComponents/DoughnutChartComponent.vue";
import CardDashComponent from "../component/DashboardComponents/CardDashComponent.vue";
import {onBeforeMount} from "vue";
import {useGlobalComponentsStore} from "../store/global/globalComponents";

onBeforeMount(() => {
  const visible = useGlobalComponentsStore();
  visible.isVisible = true
})
</script>

<template>
  <div class="mb-20">
    <div class="flex justify-center items-start pb-10">
      <h1 class="text-4xl">DASHBOARD</h1>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1">
      <CardDashComponent />
      <CardDashComponent />
      <CardDashComponent />
      <CardDashComponent />
    </div>

    <div class="py-2 flex flex-col sm:flex-row gap-1 sm:gap-1">
      <BarChartComponent />
      <DoughnutChartComponent  />
    </div>
    <LineChartComponent />
  </div>
  <!-- Renderizar uma mensagem de carregamento enquanto os dados estão sendo buscados -->
</template>

<style scoped>

</style>