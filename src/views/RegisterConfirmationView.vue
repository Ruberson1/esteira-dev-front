<template>
  <div class="grid grid-rows-2 md:flex md:items-center md:justify-center md:h-screen">
    <div class="md:w-1/2 p-4 ml-10">
      <h1 class="text-5xl font-bold mt-4 mb-4" :class="{'text-4xl': isMobile}">Cadastro realizado com sucesso</h1>
      <p class="text-lg mb-8">Seu gestor irá informa-lo assim que seu usuário for ativado.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="redirectToLogin">Voltar ao Login</button>
    </div>
    <div class="md:w-1/2 flex justify-center" :class="{isMobile}">
      <img src="../../public/images/register-confirmation.svg" alt="Imagem de erro" class="w-full h-full object-cover">
    </div>
  </div>
</template>


<script>
import {computed, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useSidebarstore} from "@/store/sidebarStore";
export default {
  name: "RegisterConfirmationView",
  setup() {
    const route = useRoute()
    const router = useRouter()

    const redirectToLogin = () => {
      router.push('/login')
    }
    const isMobile = computed(() => window.innerWidth < 768)

    return {
      redirectToLogin: ref(redirectToLogin),
      isMobile
    }
  },
  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = false
  }
}
</script>

<style scoped>

</style>