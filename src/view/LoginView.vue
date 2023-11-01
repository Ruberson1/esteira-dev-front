<script setup lang="ts">
import LoginBackground from "../component/LoginComponents/LoginBackground.vue";
import SocialLoginButtons from "../component/LoginComponents/SocialLoginButtons.vue";
import LoginFormComponent from "../component/LoginComponents/LoginFormComponent.vue";
import {onBeforeMount, inject} from "vue";
import {useGlobalComponentsStore} from "../store/global/globalComponents";
onBeforeMount(() => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  const visible = useGlobalComponentsStore();
  visible.isVisible = false
})
</script>

<template>
  <div class="2xl:container h-screen m-auto dark:bg-gray-800 bg-white">
    <LoginBackground />
    <div hidden role="hidden" class="fixed inset-0 w-6/12 ml-auto dark:bg-gray-800 bg-white bg-opacity-70 backdrop-blur-xl lg:block"></div>
    <div class="relative h-full ml-auto lg:w-6/12">
      <div class="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
        <div class="space-y-4">
          <a href="">
            <img src="../../public/images/logo.png" class="w-20" alt="licitanet logo">
          </a>
          <p class="font-medium text-lg dark:text-gray-200 text-gray-600">Esteira de desenvolvimento Dev. Bem vindo(a)!</p>
        </div>

        <SocialLoginButtons />

        <div role="hidden" class="mt-12 border-t">
          <span class="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white dark:bg-gray-800">Ou</span>
        </div>
        <LoginFormComponent />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>