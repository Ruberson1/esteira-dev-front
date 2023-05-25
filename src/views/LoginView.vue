<template>
  <div class="2xl:container h-screen m-auto bg-white">
    <LoginVideo/>
    <div hidden role="hidden" class="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"></div>
    <div class="relative h-full ml-auto lg:w-6/12">
      <div class="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
        <div class="space-y-4">
          <a href="">
            <img src="../../public/images/logo.png" class="w-20" alt="licitanet logo">
          </a>
          <p class="font-medium text-lg text-gray-600">Esteira de desenvolvimento Dev. Bem vindo(a)!</p>
        </div>

        <SocialLoginButton />

        <div role="hidden" class="mt-12 border-t">
          <span class="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">Ou</span>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script>
import SocialLoginButton from "@/components/Login/SocialLoginButton";
import LoginForm from "@/components/Login/LoginForm";
import LoginVideo from "@/components/Login/LoginVideo";
import {useSidebarstore} from "@/store/sidebarStore";
import {onMounted} from "vue";
export default {
  name: "LoginView",
  components: {LoginVideo, LoginForm, SocialLoginButton},
  beforeMount() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    const visible = useSidebarstore();
    visible.isSidebarVisible = false
  }

}
</script>

<style>


</style>