<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "../drivers/router/app-router";
import {decrypt} from "../infra/shared/Utils";

const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
onMounted(() => {
  if(!master.value) {
    alert("You do not have permission to view this page.");
    router.push({ name: 'tasks' });
  }
})
</script>

<template>
  <div class="grid grid-rows-2 md:flex md:items-center md:justify-center md:h-screen">
    <div class="md:w-1/2 justify-center flex items-center flex-col"> <!-- Add 'flex', 'items-center', and 'flex-col' classes -->
      <h1 class="text-9xl">Settings</h1>
    </div>
  </div>
</template>

<style scoped>

</style>