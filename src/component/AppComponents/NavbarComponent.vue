<script setup lang="ts">
  import {inject, onMounted, reactive, ref} from "vue";
  import {useDark, useToggle} from "@vueuse/core";
  import swal from "sweetalert2";
  import Gateway from "../../infra/gateway/Gateway";
  import UserList from "../../entity/UserList";
  import {decrypt} from "../../infra/shared/Utils";

  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  const isModalOpen = ref(false);
  const background = isDark.value ? '#1f2937' : '#fff';
  const colorText = isDark.value ? '#9ca3af' : '#111827';
  const btnCollor = isDark.value ? '#06b6d4' : '#fbbf24';
  const userList: any = reactive(new UserList());
  let dataGatewayPromise: any = null;
  const loggedUser = decrypt(sessionStorage.getItem('user'), import.meta.env.VITE_APP_ENCRYPT_KEY);
  const master = ref(loggedUser.id == import.meta.env.VITE_APP_MASTER_PROFILE);
  const userName = ref('');
  const userEmail = ref('');
  const userProfile = ref('');
  const userImage = ref('');
  const linkImage = import.meta.env.VITE_APP_LINK_CLOUD_FRONT;
  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };
  // const requestPermission = () => {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === 'granted') {
  //       swal.fire({
  //         text: 'Notifications allowed',
  //         target: '#custom-target',
  //         color: colorText,
  //         background: background,
  //         confirmButtonColor: btnCollor,
  //         customClass: {
  //           container: 'position-absolute'
  //         },
  //         toast: true,
  //         position: 'bottom-right'
  //       })
  //     }
  //   });
  // }

  const updateUser = async () => {
    if (dataGatewayPromise) {
      try {
        const dataGateway = await dataGatewayPromise;
        const useData = await dataGateway.update(`user/${loggedUser.id}`, {email: userEmail.value, name: userName.value });
        userList.createUser(useData);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error fetching dataGateway:", error);
      }
    }
  }

onMounted(async () => {
  dataGatewayPromise = inject("dataGateway") as Promise<Gateway>;
  if (dataGatewayPromise) {
    try {
      const dataGateway = await dataGatewayPromise;
      const userData = await dataGateway.getById(`user/${loggedUser.id}`);
      userList.createUser(userData);
      for (const user of userList.users) {
        userName.value = user.name;
        userEmail.value = user.email;
        userProfile.value = user.profile.name;
        userImage.value = user.image.path;
      }
    } catch (error) {
      console.error("Error fetching dataGateway:", error);
    }
  }
})
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">

          <a href="/" class="flex ml-2 md:mr-24">
            <img src="../../../public/images/logo.png" class="h-8 mr-3" alt="Licitanet Logo" />
            <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Esteira Devs</span>
          </a>
        </div>
        <div class="flex items-center">
<!--          <button @click="requestPermission" type="button" class="text-white flex bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 hover:bg-gradient-to-br-->
<!--          focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 shadow-lg shadow-amber-500/50 dark:shadow-lg-->
<!--          dark:shadow-amber-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center mt-1 mr-12 mb-2">-->
<!--            Allow-->
<!--            <svg class="w-5 h-5 ml-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">-->
<!--              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>-->
<!--            </svg>-->
<!--          </button>-->

          <div class="pr-4" @click="toggleDark()">
            <a class="hs-dark-mode-active:hidden block hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500" href="#!" data-hs-theme-click-value="dark">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
              </svg>
            </a>
            <a class="hs-dark-mode-active:block hidden hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500" href="#!" data-hs-theme-click-value="light">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            </a>
          </div>

          <div class="flex items-center ml-3">
            <div>
              <button @click="toggleModal()" type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" :src="`${linkImage}${userImage}`" alt="user photo">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- Modal User -->
  <div v-if="isModalOpen" id="authentication-modal" tabindex="-1" aria-hidden="true"
       class="fixed absolute inset-0 backdrop-blur-lg  top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden
       overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="w-full relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg shadow-cyan-500/50 dark:bg-gray-800 dark:border-gray-700">
        <button @click="toggleModal()" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
            rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="flex flex-col items-center pb-10 space-y-4">
          <div>
            <img class="w-24 mt-6 h-24 mb-3 rounded-full shadow-lg" :src="`${linkImage}${userImage}`" alt="Bonnie image"/>
          </div>
          <span class="w-20 text-center text-rose-800 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300">{{ userProfile }}</span>
          <div class="w-full inline-flex items-center justify-center">
            <input v-model="userName" type="text" id="name" class="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>
          </div>
          <div class="w-full inline-flex items-center justify-center">
            <input v-model="userEmail" type="text" id="email" class="w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   required>
          </div>
          <div class="w-4/5">
            <button @click="updateUser" class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm
            font-medium text-gray-800 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500
            group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span class="relative px-32 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
              Update
            </span>
            </button>
          </div>
          <div class="w-4/5">
            <a href="/login" class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm
            font-medium text-gray-800 rounded-lg group bg-gradient-to-br from-amber-500 to-orange-400 group-hover:from-amber-500
            group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-amber-200 dark:focus:ring-amber-800">
            <span class="relative px-32 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
              Logout
            </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#custom-target {
  position: relative;
  width: 600px;
  height: 300px;
  border-style: solid;
}

.position-absolute {
  position: absolute !important;
}
</style>