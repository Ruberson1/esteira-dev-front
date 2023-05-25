<template>
  <div class="grid grid-rows-2 md:flex md:items-center md:justify-center md:h-screen">
    <div class="md:w-1/2 p-4 ml-10">
      <h1 class="text-5xl font-bold mb-4" :class="[isMobile ? 'text-2xl' :'text-5xl']">O  Login Social está em fase de implementação</h1>
      <p class="text-lg mb-8" :class="[isMobile ? 'text-lg' :'text-2xl']">Por favor, faça seu registro/login preenchendo os campos solicitados.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="redirectToLogin">Voltar a página de Login</button>
    </div>
    <div class="md:w-1/2 flex justify-center" >
      <img src="../../public/images/social-animate.svg" alt="Imagem de erro" class="w-full h-full object-cover">
    </div>
  </div>
</template>


<script>
import {computed, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useSidebarstore} from "@/store/sidebarStore";
export default {
  name: "SocialView",
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