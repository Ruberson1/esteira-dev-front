<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useGlobalComponentsStore} from "../store/global/globalComponents";


const route = useRoute()
const router = useRouter()
const redirectToHome = () => {
  router.push('/')
}
onBeforeMount(() => {
  const visible = useGlobalComponentsStore();
  visible.isVisible = false
})
</script>


<template>
  <div class="grid grid-rows-2 md:flex md:items-center md:justify-center md:h-screen">
    <div class="md:w-1/2 p-4 ml-10">
      <h1 class="text-5xl font-bold mb-4 sm:text-4xl">Parece que você tentou acessar uma página inexistente</h1>
      <p class="text-lg mb-8">Por favor, verifique o endereço digitado e tente novamente.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="redirectToHome">Voltar a página inicial</button>
    </div>
    <div class="md:w-1/2 flex justify-center sm:mt-8" >
      <img src="../../public/images/404-error-animate.svg" alt="Imagem de erro" class="w-full h-full object-cover">
    </div>
  </div>
</template>

<style scoped>

</style>