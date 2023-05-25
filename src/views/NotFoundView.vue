<template>
  <div class="grid grid-rows-2 md:flex md:items-center md:justify-center md:h-screen">
    <div class="md:w-1/2 p-4 ml-10">
      <h1 class="text-5xl font-bold mb-4" :class="{'text-4xl': isMobile}">Parece que você tentou acessar uma página inexistente</h1>
      <p class="text-lg mb-8">Por favor, verifique o endereço digitado e tente novamente.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="redirectToHome">Voltar a página inicial</button>
    </div>
    <div class="md:w-1/2 flex justify-center" :class="{'mt-8': isMobile}">
      <img src="../../public/images/404-error-animate.svg" alt="Imagem de erro" class="w-full h-full object-cover">
    </div>
  </div>
</template>


<script>
import {computed, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useSidebarstore} from "@/store/sidebarStore";
export default {
  name: "NotFoundView",
  setup() {
    const route = useRoute()
    const router = useRouter()

    const redirectToHome = () => {
      router.push('/')
    }
    const isMobile = computed(() => window.innerWidth < 768)

    return {
      redirectToHome: ref(redirectToHome),
      isMobile
    }
  },
  mounted() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = false
  }
}
</script>

<style scoped>

</style>