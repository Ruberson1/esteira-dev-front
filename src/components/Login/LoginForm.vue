<template>
  <form @submit.prevent="onSubmit" class="space-y-6 py-6">
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
      <button type="submit" @click="loginOrRegister" class="w-full px-6 py-3 rounded-xl bg-yellow-500 transition hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-800">
        <span class="font-semibold text-white text-lg" >{{ auth.buttonLabel }}</span>
      </button>
      <a href="#" type="reset" class="w-max p-3 -ml-3">
        {{ auth.questionLabel }}
        <span class="text-sm tracking-wide text-yellow-600" @click="auth.toggleRegistration">{{ auth.buttonRegisterLabel }}</span>
      </a>
    </div>
  </form>
</template>

<script>
import { useAuthStore } from '@/store/auth/authStore';
import api from "@/main";
import {decrypt, encrypt} from "@/utils/utils";
import {inject, ref} from "vue";
export default {
  name: 'LoginForm',
  setup() {
    const swal = inject('$swal')
    const auth = useAuthStore();
    const email = ref('');
    const password = ref('');
    const user = ref(null);
    const token = ref(null);

    async function loginOrRegister() {
      if (auth.isRegistering) {
        try {
          // Do register logic with this.name
          const response = await api.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          window.location.href="/register-confirmation";
        } catch (e) {
          if (e.response.status === 400) {
            console.error(e);
            swal({
              title: 'Erro ao cadastrar',
              imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
              imageWidth: 150,
              imageHeight: 150,
              text: e.response.data.original.error,
            });
          } else if (e.response.status === 401) {
            console.error(e.response);
            swal({
              imageUrl: 'https://media.giphy.com/media/15aGGXfSlat2dP6ohs/giphy.gif',
              imageWidth: 150,
              imageHeight: 150,
              title: 'Oops...',
              text: e.response.data.message,
            });

          } else {
            swal({
              icon: 'error',
              title: 'Oops...',
              text: e.response.data,
            });
            console.error(e);
          }
        }
      } else {
        try {
          // Do login logic with this.email and this.password
          const response = await api.post('/login', {
            email: this.email,
            password: this.password
          });

          if (response.data.original.user.active == process.env.VUE_APP_INACTIVE_USER) {
            swal({
              title: 'Usuário Inativo',
              text: 'Comunique seu gestor',
              imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
              imageWidth: 150,
              imageHeight: 150,
            }).then((result) => {
              window.location.href="/login";
            });
          } else {
            const token = response.data.original.token;
            const user = encrypt(response.data.original.user, process.env.VUE_APP_ENCRYPT_KEY);

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', user);

            window.location.href="/";
          }
        }catch (e) {
          if (e.response.status === 401) {
            console.error(e.response.data.message);
            swal({
              imageUrl: 'https://media.giphy.com/media/jRrSclc8Uq9ACSMxXv/giphy.gif',
              imageWidth: 150,
              imageHeight: 150,
              title: 'Oops...',
              text: e.response.data.message,
            });
          } else if (e.response.status === 403) {
            console.error(e.response.data.original.error);
            swal({
              imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
              imageWidth: 150,
              imageHeight: 150,
              title: 'Oops...',
              text: e.response.data.original.error,
            });
          } else {
            console.error(e);
            swal({
              imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
              imageWidth: 150,
              imageHeight: 150,
              title: 'Oops...',
              text: e.response.data,
            });
          }
        }
      }
    }
    return {
      auth,
      loginOrRegister,
      user,
      token,
      name,
      email,
      password
    };
  },
};
</script>

<style scoped>

</style>