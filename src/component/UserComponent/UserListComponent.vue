<script setup lang="ts">
  import {defineProps} from "vue";
  const { users } = defineProps(["users"]);
</script>

<template>
  <div class="w-full" v-if="users.users && users.users.length > 0">
    <div class="hidden md:flex justify-center items-center bg-gray-200 dark:bg-gray-900 rounded-md">
      <div class="col-span-6">
        <div class="overflow-auto lg:overflow-visible ">
          <table class="table dark:text-gray-400 border-separate space-y-6 text-sm">
            <thead class="bg-white dark:bg-gray-800">
            <tr>
              <th class="p-4">User</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Profile</th>
              <th class="p-3 text-left">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white dark:bg-gray-800 shadow dark:shadow-cyan-500/50 " v-for="(u, index) in users.users" :key="index" >
              <td class="p-3">
                <div class="flex align-items-center">
                  <img class="rounded-full h-12 w-12  object-cover" :src="`https://d3rusw38jvfggp.cloudfront.net/${u.image.path}`" alt="unsplash image">
                  <div class="ml-3">
                    <div class="">{{ u.name }}</div>
                    <div class="text-gray-500">{{ u.email }}</div>
                  </div>
                </div>
              </td>
              <td class="p-2">
                <span :class="[ !u.active ? 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300' : 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300']" class="inline-flex items-center justify-center w-32 text-sm font-medium">
                        {{ u.active ? 'ACTIVE' : 'INACTIVE' }}</span>
              </td>
              <td class="p-2 font-bold">
                {{ u.profile.name }}
              </td>
              <td class="p-2 ">
                <svg class="w-5 h-5  text-gray-800 dark:text-cyan-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 20 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.109 17H1v-2a4
                  4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536
                  6.364-6.364a2 2 0 0 1 2.829 0Z"/>
                </svg>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- HISTÓRICO CARDS  MOBILE VIEW          -->

    <div  class="grid grid-cols-1 md:hidden sm:grid-cols-2 gap-4 " >
      <div v-for="(u, index) in users.users" :key="index" class="bg-white dark:bg-gray-800 space-y-3 p-4 rounded-lg shadow dark:shadow-cyan-500/50">
        <div class="flex items-center space-x-8 text-sm">
          <div class="text-gray-500 dark:text-cyan-300">{{ u.name }}</div>
          <div>
            <span :class="[ !u.active ? 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300' : 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300']" class="inline-flex items-center justify-center w-32 text-sm font-medium">
                        {{ u.active ? 'ACTIVE' : 'INACTIVE' }}</span>
          </div>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-50">
          {{ u.profile.name }}
        </div>
        <div class="text-sm font-medium dark:text-cyan-300 text-black">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="grid grid-rows-2 md:flex md:items-center md:justify-center ">
    <div class="md:w-1/2 justify-center flex items-center flex-col"> <!-- Add 'flex', 'items-center', and 'flex-col' classes -->
      <img src="../../../public/images/empty.svg" alt="Imagem de erro" class="w-1/2 h-1/2 object-cover">
      <h1 class="text-2xl">Nenhum usuário cadastrado</h1>
    </div>
  </div>
</template>

<style scoped>
.table {
  border-spacing: 0 12px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n+4),
tr th:nth-child(n+4) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}
</style>