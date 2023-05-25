<template>

  <div id="app" >
    <!--Sidebar with Dimmer -->
    <div class="fixed inset-0 flex z-10" v-if="visible.isSidebarVisible">
      <!-- Sidebar -->
        <div
          class="absolute flex top-0 h-screen z-20"
          :class="[right ? 'right-0 flex-row' : 'left-0 flex-row-reverse']"
        >
        <!--Drawer -->
        <button
            @click.prevent="openSideBar()" :class="[isMobile ? 'w-4' : 'w-5']"
            class=" h-48 p-1 my-auto rounded text-white bg-amber-400 text-center focus:outline-none hover:bg-gray-500 transition-color duration-300"
        >
        <span
         :class="[right ? '-rotate-90' : 'rotate-90']"
         class="block transform origin-center font-bold"
          >
      <svg :class="[open ? '-rotate-90' : 'rotate-90']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
        </span>
        </button>

        <!-- Sidebar Content -->

        <div
            ref="content"
            class="transition-all duration-700 dark:bg-gray-800 overflow-hidden flex items-center justify-center"
            :class="[open ? 'max-w-lg' : 'max-w-0']"
          >
          <div class="w-56 text-center font-bold text-xl h-screen" >
            <div class="dark:bg-gray-800 h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
              <a href="/" class="flex items-center space-x-4 p-2 pb-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                     class="w-10 h-10 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span class="text-xl font-extrabold text-gray-800 dark:text-white">Esteira Devs</span>
              </a>
              <ul class="space-y-2">
                <li>
                  <a href="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                         class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold">Home</span>
                  </a>
                </li>
                <li>
                  <a href="/pull" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500"
                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
                      </path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold">Pull Requests</span>
                    <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">3</span>
                  </a>
                </li>
                <li @click="logout()">
                  <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                         class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>

                    <span class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold">Sair</span>
                  </a>
                </li>
                <li v-if="true">
                  <a href="/users" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg aria-hidden="true" stroke="currentColor" class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                    </path>
                    </svg>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold">Users</span>
                  </a>
                </li>
                <li>
                  <button @click="showSettings()" type="button" class=" transition ease-in-out delay-150 flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                         class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                    </svg>
                    <span class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold" >Settings</span>
                      <svg :class="[settings ? '-rotate-180' : 'rotate-0']" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                  <ul id="dropdown-example" class=" py-2 space-y-2 transition-all duration-300 ease-in-out" :class="[settings ? '' : 'hidden']">
                    <li>
                      <a @click="toggleDark()" href="#" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                             class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                        <span  class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold" >Change Theme</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" @click="rightSidebar()" class="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                             class="flex-shrink-0 w-6 h-6 text-blue-500 transition duration-75 dark:text-amber-400 group-hover:text-amber-400 dark:group-hover:text-blue-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                        </svg>
                        <span class="flex-1 ml-3 text-left whitespace-nowrap hover:font-bold">Change Side</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <slot></slot>
        </div>
      </div>
      <transition name="fade">
        <!-- Dimmer -->
        <div
            v-if="dimmer && open"
            @click="openSideBar()"
            class="flex-1 bg-gray-900 bg-opacity-90 active:outline-none z-10"
        />
      </transition>
    </div>
      <!-- Page Content -->
    <div v-if="visible.isSidebarVisible" :class="{ 'z-0': open, 'z-40': !open , 'w-80': isMobile}"
         class="absolute inset-1/2 rounded bg-gray-50 dark:bg-gray-800 w-9/12 min-h-screen transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
    >
      <router-view/>
    </div>
    <div v-else>
      <router-view/>
    </div>

  </div>
</template>

<script>
import {computed, ref} from 'vue';
import {useSidebarstore} from "@/store/sidebarStore";
import {useThemeStore} from "@/store/themeStore";
import { useDark, useToggle } from '@vueuse/core';

export default {
  setup() {
    const themeStore = useThemeStore();
    const visible = useSidebarstore();
    const contentInput = ref('');
    const open = ref(false);
    const dimmer = ref(true);
    const settings = ref(false);
    const isMobile = computed(() => window.innerWidth < 768)
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const right = ref(false);


    function openSideBar() {
      open.value = !open.value;
    }

    function logout() {
      window.location.href = '/login';
    }

    function rightSidebar() {
      right.value = !right.value
      localStorage.setItem('rightSidebar', right.value)
    }
    function showSettings() {
      settings.value = !settings.value;
    }

    return {
      open,
      dimmer,
      right,
      openSideBar,
      rightSidebar,
      settings,
      showSettings,
      isMobile,
      visible,
      themeStore,
      contentInput,
      isDark,
      toggleDark,
      logout
    };
  },
  mounted() {
    if(localStorage.getItem('rightSidebar') === 'false') {
      this.right = false
    } else if (localStorage.getItem('rightSidebar') === 'true') {
      this.right = true
    }
  }
};
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dark {
  --bg-color: #1f2937;
  --text-color: gray;
  background-color: var(--bg-color);
  color: var(--text-color);
}
html {
  background: #f9fafb;
}
</style>