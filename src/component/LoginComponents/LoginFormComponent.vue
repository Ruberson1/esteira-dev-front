<script setup lang="ts">
import {computed, inject, ref} from "vue";
import { useAuthStore } from '../../store/auth/auth';
import Gateway from "../../infra/gateway/Gateway";
import {is} from "date-fns/locale";

// let dataGatewayPromise: any = null;
const auth = useAuthStore();
const email = ref('');
const name = ref('');
const password = ref('');
const user = ref(null);
const token = ref(null);
const dataGateway = inject("dataGateway") as Gateway;
const isEmpty = computed(() => {
  return email.value === '' || password.value === '';
});
const loginOrRegister = async () => {

  if (auth.isRegistering) {
    const register = await dataGateway.create(`register`, {email: email.value,password: password.value ,name: name.value});
  } else {
    const login = await dataGateway.create(`login`, {email: email.value, password: password.value});
  }
}
</script>

<template>
  <form @submit.prevent="" class="space-y-6 py-6 dark:bg-gray-800">
    <div v-if="auth.showNameInput" >
      <input
          type="text"
          name="name"
          placeholder="Seu Nome"
          id="name"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400"
          v-model="name"
      />
    </div>
    <div>
      <input
          type="email"
          placeholder="Seu Email"
          name="email"
          id="email"
          v-model="email"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
    </div>

    <div class="flex flex-col items-end">
      <input
          v-model="password"
          type="password"
          placeholder="Sua Senha"
          name="pass"
          id="pass"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
    </div>

    <div>
      <button type="submit" :disabled="isEmpty" :class="{'cursor-not-allowed': isEmpty}" @click="loginOrRegister" class=" w-full px-6 py-3 rounded-xl bg-amber-400 transition hover:bg-amber-500 focus:bg-amber-600 active:bg-amber-200">
        <span class="font-semibold text-white text-lg" >{{ auth.buttonLabel }}</span>
      </button>
      <a href="#" type="reset" class="w-max p-3 -ml-3 text-gray-600 dark:text-gray-200">
        {{ auth.questionLabel }}
        <span class="text-sm font-semibold hover:text-amber-500 tracking-wide text-amber-400" @click="auth.toggleRegistration">{{ auth.buttonRegisterLabel }}</span>
      </a>
    </div>
  </form>
</template>

<style scoped>

</style>