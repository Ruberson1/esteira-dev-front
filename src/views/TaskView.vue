<template>
  <div class="container mx-auto mt-12">
    <div class="w-full">
      <div class="text-center pb-2 text-2xl font-bold dark:text-gray-200">
        <h1>Cadastro e edição de tarefas</h1>
      </div>
      <form class="bg-white dark:bg-gray-800 dark:shadow-cyan-500/50 shadow-md rounded space-y-4 px-8 pt-6 pb-8 mb-4">
        <div class="card flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 flex justify-content-center">
          <Dropdown v-model="selectedCity" :options="users"
                    optionLabel="name" placeholder="Selecione o usuário" class="p-inputtext-sm md:w-14rem" :class="{ 'w-full': isMobile}"/>
          <Dropdown v-model="selectedCity" :options="users"
                    optionLabel="name" placeholder="Selecione o status" class="p-inputtext-sm md:w-14rem" :class="{ 'w-full': isMobile}"/>
        </div>
        <div class="card w-full  justify-content-center">
          <span class="p-float-label">
            <InputText id="username" class="w-full p-inputtext-sm" v-model="value" />
            <label for="username">Título</label>
          </span>
        </div>
        <div class="card w-full justify-content-center">
          <span class="p-float-label">
            <Textarea v-model="value" class="w-full" rows="5" cols="30" />
            <label>Descrição</label>
          </span>
        </div>
        <div class="card row flex flex-wrap " :class="{ 'space-y-2': isMobile}">
          <span class="p-float-label col flex-grow ">
            <Calendar class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="date" inputId="ini_req" />
            <label for="birth_date">Início Requerido</label>
          </span>
          <span class="p-float-label col flex-grow">
            <Calendar class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="date" inputId="ini_dev" />
            <label for="birth_date">início Dev.</label>
          </span>
          <span class="p-float-label col flex-grow">
            <Calendar  class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="date" inputId="ent_hom" />
            <label for="birth_date">Entrega Homolog.</label>
          </span>
          <span class="p-float-label col flex-grow">
            <Calendar class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="date" inputId="ent_prod" />
            <label for="birth_date">Entrega Prod.</label>
          </span>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {useSidebarstore} from "@/store/sidebarStore";
import {computed, inject, ref} from "vue";
import Dropdown from 'primevue/dropdown';
import api from "@/main";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';

export default {
  name: "TaskView",
  components: {
    Dropdown,
    InputText,
    Textarea,
    Calendar
  },
  setup() {
    const swal = inject('$swal');
    const selectedCity = ref();
    const users = ref([]);
    const isMobile = computed(() => window.innerWidth < 768)

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
      isMobile,
      selectedCity,
      getUsers,
      users
    }
  },
  async mounted() {
    this.getUsers();
  },

  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = true
  }
}
</script>

<style scoped>

</style>