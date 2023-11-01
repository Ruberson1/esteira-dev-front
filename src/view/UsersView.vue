<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
import UserList from "../entity/UserList";
import Gateway from "../infra/gateway/Gateway";
import UserListComponent from "../component/UserComponent/UserListComponent.vue";
import {decrypt} from "../infra/shared/Utils";
import router from "../drivers/router/app-router";

const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
const master = ref(loggedUser.profile.id == import.meta.env.VITE_APP_MASTER_PROFILE);
const userList: any = reactive(new UserList());
let dataGatewayPromise: any = null;

onMounted(async () => {
  if(!master.value) {
    alert("You do not have permission to view this page.");
    router.push({ name: 'tasks' });
  }
  dataGatewayPromise = inject("dataGateway") as Promise<Gateway>;
  if (dataGatewayPromise) {
    try {
      const dataGateway = await dataGatewayPromise;
      const usersData = await dataGateway.getAll('users');

      userList.addUsers(usersData);
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
})
</script>

<template>
  <UserListComponent :users="userList" />
</template>

<style scoped>

</style>