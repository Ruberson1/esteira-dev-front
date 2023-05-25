<template>
  <Dialog class="w-9/12" v-model:visible="modalUpdatePull" modal header="Pull Requests"  :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <form class="bg-white  space-y-4 px-8 pt-6 pb-8 mb-4">
      <div class="card justify-content-center p-2 w-full " :class="{'pointer-events-none': !master}">
        <p>Status</p><InputSwitch v-model="pull.approved" @click="pull.approved = !pull.approved"/>
      </div>
      <div class="card flex flex-wrap space-y-4 md:space-y-0 md:space-x-8 flex justify-content-center">
        <p class="text-gray-600 pt-3.5 "><span class="font-bold">Tarefa:</span> #{{ pull.task_id }}</p>
        <p class="text-gray-600 md:space-x-2" :class="{ 'w-full': isMobile }">
          <span class="font-bold ">Dev:</span>
          <Dropdown v-model="pull.user" :options="users"
                    optionLabel="name" placeholder="Selecione o usuário" class="p-inputtext-sm md:w-14rem"
                    :class="{ 'w-full': isMobile, 'pointer-events-none': master }"/>
        </p>
      </div>
      <div class="card w-full  justify-content-center" >
          <span class="p-float-label">
            <InputText id="{{ pull.id }}" class="w-full p-inputtext-sm" v-model="pull.link_v2" />
            <label>Back V2</label>
          </span>
      </div>
      <div class="card w-full  justify-content-center">
          <span class="p-float-label">
            <InputText id="{{ pull.id }}" class="w-full p-inputtext-sm" v-model="pull.link_front" />
            <label>Front V2</label>
          </span>
      </div>
      <div class="card w-full  justify-content-center">
          <span class="p-float-label">
            <InputText id="{{ pull.id }}" class="w-full p-inputtext-sm" v-model="pull.link_micros" />
            <label>Microsserviços</label>
          </span>
      </div>
      <div class="flex items-center justify-between">
        <a  @click="updatePull(pull.id)" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold
          hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
          Atualizar
        </a>
      </div>
    </form>
  </Dialog>
  <div class="overflow-auto rounded-lg shadow dark:shadow-cyan-500/50 hidden md:block">
    <table class="w-full">
      <thead class="bg-gray-50 dark:bg-gray-600 border-b-2 border-gray-200 dark:border-gray-50">
      <tr>
        <th class="w-36 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Link Back</th>
        <th class="w-36 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Link Front</th>
        <th class="w-36 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Link Micros</th>
        <th class="w-24 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Status</th>
        <th class="w-32 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Usuário</th>
        <th class="w-32 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Tarefa</th>
        <th v-if="master" class="w-32 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Editar</th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-100">

      <tr v-for="(pull, index) in pulls" :key="index" class="bg-white dark:bg-gray-800">
        <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
          <a v-bind:href= pull.link_v2  target="_blank" :class="{'underline text-sky-600 font-bold' : pull.link_v2}">
            {{ pull.link_v2 ? 'visualizar' : 'SEM PR' }}
          </a>
        </td>
        <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
          <a v-bind:href= pull.link_front  target="_blank" :class="{'underline text-sky-600 font-bold' : pull.link_front}">
            {{ pull.link_front ? 'visualizar' : 'SEM PR' }}
          </a>
        </td>
        <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
          <a v-bind:href= pull.link_micros  target="_blank" :class="{'underline text-sky-600 font-bold' : pull.link_micros}">
            {{ pull.link_micros ? 'visualizar' : 'SEM PR' }}
          </a>
        </td>

        <td class="p-3 text-sm text-gray-700 dark:text-cyan-300  whitespace-nowrap">
          <div  class="card flex justify-content-center ">
              <span :class="[
                  pull.approved
              ? 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300'
              : 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300']"
                    class="inline-flex items-center justify-center w-36 text-sm font-medium">
                {{ pull.approved ? 'APROVADO' : 'NÃO APROVADO' }}
              </span>
          </div>
        </td>
        <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
          {{ pull.task.user.name }}
        </td>
        <td  class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
          {{ pull.task.title }}
        </td>
        <td v-if="master" class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
          <svg @click="getPullById(pull.id); modalUpdatePull = true; getUsers()"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!-- CARDS PULL-->
  <div  class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
    <div v-for="(pull, index) in pulls" :key="index" class="bg-white dark:bg-gray-800 space-y-3 p-4 rounded-lg shadow dark:shadow-cyan-500/50">
      <div class="flex items-center space-x-8 text-sm">
        <div>
          <a href="#" class=" font-bold">{{pull.task_id}}</a>
        </div>
        <div class="text-gray-500 dark:text-cyan-300">{{ pull.task.user.name }}</div>
        <div>
          <div  class="card flex justify-content-center ">
              <span :class="[
                  pull.approved
              ? 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300'
              : 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300']"
                    class="inline-flex items-center justify-center w-32 text-sm font-medium">
                {{ pull.approved ? 'APROVADO' : 'NÃO APROVADO' }}
              </span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap space-x-4">
          <a v-bind:href= pull.link_v2 :class="{'underline text-sky-600 font-bold' : pull.link_v2}">
            {{ pull.link_v2 ? 'visualizar' : 'SEM PR' }}
          </a>
          <a v-bind:href= pull.link_front :class="{'underline text-sky-600 font-bold' : pull.link_front}">
            {{ pull.link_front ? 'visualizar' : 'SEM PR' }}
          </a>
          <a v-bind:href= pull.link_micros :class="{'underline text-sky-600 font-bold' : pull.link_micros}">
            {{ pull.link_micros ? 'visualizar' : 'SEM PR' }}
          </a>
          <div v-if="master" class="cursor-pointer p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
            <svg @click="getPullById(pull.id); modalUpdatePull = true; getUsers()"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import {useSidebarstore} from "@/store/sidebarStore";
import api from "@/main";
import {computed, inject, ref} from "vue";
import {decrypt} from "@/utils/utils";
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import "primevue/resources/themes/md-light-indigo/theme.css";
import ScrollPanel from "primevue/scrollpanel";


export default {
  name: "PullView",
  components: {
    InputSwitch,
    ScrollPanel,
    Dropdown,
    Dialog,
    InputText
  },
  setup() {
    const pulls = ref([]);
    const modalUpdatePull = ref(false);
    const pull = ref([]);
    const users = ref([]);
    const swal = inject('$swal');

    const isMobile = computed(() => window.innerWidth < 768);
    const LoggedUser = decrypt(sessionStorage.getItem('user'), process.env.VUE_APP_ENCRYPT_KEY);
    const master = ref(LoggedUser.profile.id == process.env.VUE_APP_MASTER_PROFILE);

    async function getPulls() {
      try {
        const resp = await api.get('/pulls');
        this.pulls = resp.data.data.data;
      } catch (e) {
        console.error(e);
        swal({
          imageUrl: 'https://media.giphy.com/media/15aGGXfSlat2dP6ohs/giphy.gif',
          imageWidth: 150,
          imageHeight: 150,
          title: 'Oops...',
          text: e.response.data,
        }).then((result) => {
          window.location.href="/login";
        });
      }
    }

    async function getPullsByUser() {
      try {
        const resp = await api.get(`/pull/user/${LoggedUser.id}`);
        this.pulls = resp.data.data.data;
      } catch (e) {
        console.error(e);
        swal({
          imageUrl: 'https://media.giphy.com/media/15aGGXfSlat2dP6ohs/giphy.gif',
          imageWidth: 150,
          imageHeight: 150,
          title: 'Oops...',
          text: e.response.data,
        }).then((result) => {
          window.location.href="/login";
        });
      }
    }

    async function getPullById(bugId) {
      try {
        const resp = await api.get(`/pull/${bugId}`);
        this.pull = resp.data.data;
      } catch (e) {
        if (e.response.status === 401) {
          console.error(e.response.data);
          swal({
            imageUrl: 'https://media.giphy.com/media/15aGGXfSlat2dP6ohs/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            title: 'Oops...',
            text: e.response.data,
          }).then((result) => {
            window.location.href="/login";
          });
        }
      }
    }

    async function updatePull(pullId) {
      try {
        const resp = await api.put(`/pull/${pullId}`,{

          user_id: this.pull.user_id,
          task_id: this.pull.task_id,
          link_v2: this.pull.link_v2,
          link_front: this.pull.link_front,
          link_micros: this.pull.link_micros,
          approved: this.pull.approved
        });
        this.modalUpdatePull = false;
        if(!this.master) {
          this.getPulls();
        } else {
          this.getPullsByUser();
        }
        if(resp.data.status_code === 400) {
          swal({
            title: 'Erro ao cadastrar',
            imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            text: resp.data.error_description.description,
          });
        } else if (resp.data.status_code === 201) {
          swal({
            imageUrl: 'https://media.giphy.com/media/bzE1WAm8BifiE/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            title: 'Yeah!!!...',
            text: 'Criada com sucesso!',
          }).then((result) => {
            this.getTasks();
          });
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          swal({
            imageUrl: 'https://media.giphy.com/media/15aGGXfSlat2dP6ohs/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            title: 'Oops...',
            text: e.response.data,
          }).then((result) => {
            window.location.href="/login";
          });
        } if (e.response.status === 200) {
          console.error(e);

        }
      }

    }

    async function getUsers() {
      try {
        const resp = await api.get('/users');
        this.users = resp.data.data.data;
      } catch (e) {
        console.error(e);
        swal({
          imageUrl: 'https://media.giphy.com/media/15aGGXfSlat2dP6ohs/giphy.gif',
          imageWidth: 150,
          imageHeight: 150,
          title: 'Oops...',
          text: e.response.data,
        }).then((result) => {
          window.location.href="/login";
        });
      }
    }

    return {
      getPulls,
      getPullById,
      getPullsByUser,
      getUsers,
      users,
      modalUpdatePull,
      updatePull,
      pulls,
      pull,
      isMobile,
      master

    }
  },

  async mounted() {
    if(!this.master) {
      this.getPulls();
    } else {
      this.getPullsByUser();
    }

  },
  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = true
  },
}
</script>

<style scoped>

</style>