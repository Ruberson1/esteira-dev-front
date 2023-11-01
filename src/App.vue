<script setup lang="ts">
import SidebarComponent from "./component/AppComponents/SidebarComponent.vue";
import BottomNavigationComponent from "./component/AppComponents/BottomNavigationComponent.vue";
import NavbarComponent from "./component/AppComponents/NavbarComponent.vue";
import {useGlobalComponentsStore} from "./store/global/globalComponents";


const user = sessionStorage.getItem('user')
const visible = useGlobalComponentsStore();

</script>

<template>
  <NavbarComponent v-if="visible.isVisible && user" />
  <SidebarComponent v-if="visible.isVisible" />
  <BottomNavigationComponent v-if="visible.isVisible" class="block md:hidden"/>

  <div class="p-4 sm:ml-64">
    <div class="p-4  mt-14">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
