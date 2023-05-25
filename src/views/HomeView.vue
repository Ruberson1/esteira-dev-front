<template>
  <div class="container mx-auto">

    <!--  MODAL CADASTRO E EDIÇÃO DE TAREFAS -->

    <Dialog class="w-9/12" v-model:visible="modalFormTask" modal header="Cadastro/Edição Tarefa"  :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
      <form class="bg-white  space-y-4 px-8 pt-6 pb-8 mb-4">
        <div class="card flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 flex justify-content-center">
          <Dropdown v-model="task.user" :options="users"
                    optionLabel="name" placeholder="Selecione o usuário" class="p-inputtext-sm md:w-14rem" :class="{ 'w-full': isMobile, 'pointer-events-none': !master }"/>
          <Dropdown v-model="task.status" :options="status" @change="libHomolog(task.status.id)"
                    optionLabel="name" placeholder="Selecione o status" class="p-inputtext-sm md:w-14rem" :class="{ 'w-full': isMobile}"/>
        </div>
        <div class="card w-full  justify-content-center" :class="{ 'pointer-events-none': !master }">
          <span class="p-float-label">
            <InputText id="{{ task.id }}" class="w-full p-inputtext-sm" v-model="task.title" />
            <label>Titulo</label>
          </span>
        </div>
        <div class="card w-full justify-content-center" :class="{ 'pointer-events-none': !master }">
          <span class="p-float-label">
            <Textarea v-model="task.description" class="w-full" rows="5" cols="30" />
            <label>Descrição</label>
          </span>
        </div>
        <div class="card row flex flex-wrap " :class="{ 'space-y-2': isMobile}">
          <span :class="{ 'pointer-events-none': !master}" class="p-float-label col flex-grow">
            <Calendar @change="alterTaskDate = true" dateFormat="dd-mm-yy" class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="task.task_date" inputId="ini_req" />
            <label >Início Requerido</label>
          </span>
          <span class="p-float-label col flex-grow">
            <Calendar @change="alterDevDate = true" dateFormat="dd-mm-yy" class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="task.dev_date" inputId="ini_dev" />
            <label >início Dev.</label>
          </span>
          <span :class="{ 'pointer-events-none': !master}" class="p-float-label col flex-grow">
            <Calendar @change="alterReqHomologDate = true" dateFormat="dd-mm-yy" class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="task.req_homolog_date" inputId="ent_hom" />
            <label >Dat Homolog.</label>
          </span>
          <span class="p-float-label col flex-grow">
            <Calendar @change="alterLibHomologDate = true" dateFormat="dd-mm-yy" class="p-inputtext-sm" :class="{ 'w-full': isMobile}" v-model="task.homolog_date" inputId="ent_prod" />
            <label >Dat Lib. Homolog.</label>
          </span>
        </div>
        <div class="flex items-center justify-between">
          <a v-if="editTask" @click="updateTask(task.id)" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
            Atualizar
          </a>
          <a v-else @click="createTask()" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
            Salvar
          </a>
        </div>
      </form>
    </Dialog>

    <!--  MODAL HISTÓRICO  -->

    <Dialog class="w-9/12" v-model:visible="historyModal" modal header="Histórico"  :breakpoints="{ '960px': '75vw', '641px': '100vw' }">

      <!-- HISTÓRICO TABLE            -->

      <ScrollPanel v-if="!isMobile"  style="width: 100%; height: 400px">
        <div class="overflow-auto pb-0 rounded-lg shadow dark:shadow-cyan-500/50 hidden md:block">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-600 border-b-2 border-gray-200 dark:border-gray-50">
            <tr>
              <th class="w-0.5 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Usuário</th>
              <th class="w-36 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Status</th>
              <th class="w-72 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Tarefa</th>
              <th class="w-24 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Data</th>
            </tr>
            </thead>
            <tbody class="overflow-auto divide-y divide-gray-100">
            <tr v-for="(h, index) in history" :key="index" class="bg-white dark:bg-gray-800">
              <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
                {{ h.user.name }}
              </td>
              <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
                        <span :class="{
                          'text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-300': h.status.id === 1,
                          'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300': h.status.id === 2,
                          'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300': h.status.id === 3,
                          'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300': h.status.id === 4,
                          'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300': h.status.id === 5,
                          'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300': h.status.id === 6,
                          'text-fuchsia-800 bg-fuchsia-100 rounded dark:bg-fuchsia-900 dark:text-fuchsia-300': h.status.id === 7,
                          'text-rose-800 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300': h.status.id === 8,
                          'text-zinc-800 bg-slate-100 rounded dark:bg-slate-900 dark:text-slate-300': h.status.id === 9,
                        }"
                              class=" inline-flex items-center justify-center md:w-40 text-sm font-medium">
                          {{ h.status.name }}
                        </span>
              </td>
              <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
                {{ h.task.title }}
              </td>
              <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
                {{ h.history_date }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </ScrollPanel>

      <!-- HISTÓRICO CARDS  MOBILE VIEW          -->

      <ScrollPanel v-if="isMobile" style="width: 100%; height: 200px">
        <div  class="grid grid-cols-1 sm:grid-cols-2 gap-4 " >
          <div v-for="(h, index) in history" :key="index" class="bg-white dark:bg-gray-800 space-y-3 p-4 rounded-lg shadow dark:shadow-cyan-500/50">
            <div class="flex items-center space-x-8 text-sm">
              <div class="text-gray-500 dark:text-cyan-300">{{ h.user.name }}</div>
              <div>
                <div  class="card flex justify-content-center ">
                        <span :class="{
                        'text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-300': h.status.id === 1,
                        'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300': h.status.id === 2,
                        'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300': h.status.id === 3,
                        'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300': h.status.id === 4,
                        'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300': h.status.id === 5,
                        'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300': h.status.id === 6,
                        'text-fuchsia-800 bg-fuchsia-100 rounded dark:bg-fuchsia-900 dark:text-fuchsia-300': h.status.id === 7,
                        'text-rose-800 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300': h.status.id === 8,
                        'text-zinc-800 bg-slate-100 rounded dark:bg-slate-900 dark:text-slate-300': h.status.id === 9,
                      }"
                              class=" inline-flex items-center justify-center md:w-40 text-sm font-medium">
                        {{ h.status.name }}
                        </span>
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-50">
              {{ h.task.title }}
            </div>
            <div class="text-sm font-medium dark:text-cyan-300 text-black">
              {{ h.history_date }}
            </div>
          </div>
        </div>
      </ScrollPanel>

    </Dialog>

    <!--  MODAL CADBUG  -->

    <Dialog class="w-9/12" v-model:visible="modalFormBug" modal header="Cadastro/Edição Bugs"  :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
      <form class="bg-white  space-y-4 px-8 pt-6 pb-8 mb-4">
        <div class="card flex flex-wrap space-y-4 md:space-y-0 md:space-x-8 flex justify-content-center">
          <p v-if="editBug" class="text-gray-600 pt-3.5 "><span class="font-bold">Task:</span> #{{ bug.task_id }}</p>
          <p v-else class="text-gray-600 pt-3.5 "><span class="font-bold">Task:</span> #{{ task.id }}</p>
          <p class="text-gray-600 md:space-x-2" :class="{ 'w-full': isMobile }">
            <span class="font-bold ">Dev:</span>
            <Dropdown v-if="editBug" v-model="bug.user" :options="users"
                     optionLabel="name" placeholder="Selecione o usuário" class="p-inputtext-sm md:w-14rem"
                     :class="{ 'w-full': isMobile, 'pointer-events-none': tester }"/>
            <Dropdown v-else v-model="task.user" :options="users"
                      optionLabel="name" placeholder="Selecione o usuário" class="p-inputtext-sm md:w-14rem"
                      :class="{ 'w-full': isMobile, 'pointer-events-none': tester }"/>
          </p>
          <p class="text-gray-600 md:space-x-2" :class="{ 'w-full': isMobile }">
            <span class="font-bold ">Categoria:</span>
            <Dropdown v-model="bug.category" :options="categories"
                      optionLabel="name" placeholder="Selecione a categoria" class="p-inputtext-sm md:w-14rem"
                      :class="{ 'w-full': isMobile, 'pointer-events-none': tester }"/>
          </p>
        </div>
        <div class="card w-full  justify-content-center" :class="{ 'pointer-events-none': !master }">
          <span class="p-float-label">
            <InputText id="{{ bug.id }}" class="w-full p-inputtext-sm" v-model="bug.title" />
            <label>Titulo</label>
          </span>
        </div>
        <div class="card w-full  justify-content-center" :class="{ 'pointer-events-none': !master }">
          <span class="p-float-label">
            <InputText id="{{ bug.id }}" class="w-full p-inputtext-sm" v-model="bug.tests" />
            <label>Testes realizados</label>
          </span>
        </div>
        <div class="card w-full justify-content-center" :class="{ 'pointer-events-none': !master }">
          <span class="p-float-label">
            <Textarea v-model="bug.description" class="w-full" rows="5" cols="30" />
            <label>Descrição</label>
          </span>
        </div>
        <div>
<!--          <div class="col-md-5">-->
<!--            <form>-->
<!--              <div class="form-group">-->
<!--                <input type="file" accept="image/*" multiple="multiple"  @change="previewMultiImage" class="cursor-pointer form-control-file border-2 rounded" id="my-file">-->

<!--                <div class="border border-gray-400 rounded p-2 mt-3">-->
<!--                  <p>Preview:</p>-->
<!--                  <template>-->
<!--                    <div  :key="index">-->
<!--                      <img :src="item" class="img-fluid" />-->

<!--                    </div>-->
<!--                  </template>-->
<!--                </div>-->
<!--              </div>-->
<!--            </form>-->
<!--          </div>-->
        </div>
        <div class="flex items-center justify-between">
          <a v-if="editBug" @click="updateBug(bug.id)" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
            Atualizar
          </a>
          <a v-else @click="createBug()" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
            Salvar
          </a>
        </div>
      </form>
    </Dialog>

    <!--  MODAL LISTBUG  -->

    <Dialog class="w-9/12" v-model:visible="bugListModal" modal header="Bugs"  :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
      <div class="card" v-for="(bug, index) in bugs" :key="index" >
        <Accordion class="accordion-custom card pb-2">
          <AccordionTab class="dark:bg-gray-800 dark:text-gray-50 shadow dark:shadow-cyan-500/50" :toggleable="true">
            <template class="" #header>
              <div class="space-x-2 flex align-items-center dark:hover:text-cyan-300 dark:text-gray-400">
                <Avatar v-if="!isMobile" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2"  shape="circle" />
                <span class="font-bold text-sm hidden md:block">{{ bug.title }} </span>
                <span class="font-bold text-sm md:hidden">#{{bug.id}} </span>
                <div class="space-x-1">
                <span :class="{
                  'text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-300': bug.category.id === 1,
                 'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300': bug.category.id === 2,
                 'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300': bug.category.id === 3,
                 'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300': bug.category.id === 4,
                 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300': bug.category.id === 5
                }"
                      class=" inline-flex items-center justify-center md:w-40 text-sm font-medium">
                  {{ bug.category.name }}
                </span>
                </div>
                <div v-if="master" class="flex flex-wrap space-x-5">
                  <div class="pl-1" @click="modalFormBug = true; bugListModal = false; getBugById(bug.id); editBug = true; getCategories(); getUsers();">
                    <a class=" pi pi-pencil"></a>
                  </div>
                  <div class="pl-1 text-red-600" >
                    <a class=" pi pi-trash"></a>
                  </div>
                </div>

              </div>
            </template>
            <div class="pb-18 md:px-16">
              <p class="text-center font-bold md:text-4xl text-gray-600 text-2xl">{{ bug.user.name }}</p>
              <div>
                <p class="text-gray-600"><span class="font-bold">Cod. Tarefa:</span> #{{ bug.task_id }}</p>
                <p class="text-gray-600"><span class="font-bold">Titulo:</span> {{ bug.title }}</p>

              </div>
              <div class="pl-2 pt-3">
                <p class="text-gray-600 font-bold">Testes Realizados:</p>
                <ScrollPanel style="width: 100%; height: 100px">
                  <p >{{bug.tests}}</p>
                </ScrollPanel>
              </div>
              <div class="pl-2 pt-3">
                <p class="text-gray-600 font-bold">Descrição:</p>
                <ScrollPanel style="width: 100%; height: 200px">
                  <p >{{bug.description}}</p>
                </ScrollPanel>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </Dialog>

    <!--  MODAL CADPULL  -->

    <Dialog class="w-9/12" v-model:visible="modalFormPull" modal header="Pull Requests"  :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
      <form class="bg-white  space-y-4 px-8 pt-6 pb-8 mb-4">
        <div class="card flex flex-wrap space-y-4 md:space-y-0 md:space-x-8 flex justify-content-center">
          <p class="text-gray-600 pt-3.5 "><span class="font-bold">Task:</span> #{{ task.id }}</p>
          <p class="text-gray-600 md:space-x-2" :class="{ 'w-full': isMobile }">
            <span class="font-bold ">Dev:</span>
            <Dropdown v-model="task.user" :options="users"
                      optionLabel="name" placeholder="Selecione o usuário" class="p-inputtext-sm md:w-14rem"
                      :class="{ 'w-full': isMobile, 'pointer-events-none': tester }"/>
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
          <a  @click="createPull()" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold
          hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
            Salvar
          </a>
        </div>
      </form>
    </Dialog>

    <!--  LOGO  -->
    <div class="flex justify-center pb-20">
      <img v-if="!isDark" src="../../public/images/Logo-preto.png" class="w-2/4" alt="logo">

      <img v-if="isDark" src="../../public/images/Logo-horizontal.png" class="w-2/4" alt="logo">
    </div>

    <!-- ACCORDION            -->

    <div class="card" v-for="(task, index) in tasks" :key="index" >
      <Accordion class="accordion-custom card pb-2">
        <AccordionTab class="dark:bg-gray-800 dark:text-gray-50 shadow dark:shadow-cyan-500/50" :toggleable="true">
          <template class="" #header>
            <div class="space-x-2 flex align-items-center dark:hover:text-cyan-300 dark:text-gray-400">
              <Avatar v-if="!isMobile" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2"  shape="circle" />
              <span class="font-bold text-sm hidden md:block">{{ task.title }} </span>
              <span class="font-bold text-sm md:hidden">#{{task.id}} </span>
              <div class="space-x-1">
                <span :class="{
                  'text-amber-800 bg-amber-100 rounded dark:bg-amber-900 dark:text-amber-300': task.status.id === 1,
                 'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300': task.status.id === 2,
                 'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300': task.status.id === 3,
                 'text-teal-800 bg-teal-100 rounded dark:bg-teal-900 dark:text-teal-300': task.status.id === 4,
                 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300': task.status.id === 5,
                 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300': task.status.id === 6,
                 'text-fuchsia-800 bg-fuchsia-100 rounded dark:bg-fuchsia-900 dark:text-fuchsia-300': task.status.id === 7,
                 'text-rose-800 bg-rose-100 rounded dark:bg-rose-900 dark:text-rose-300': task.status.id === 8,
                 'text-zinc-800 bg-slate-100 rounded dark:bg-slate-900 dark:text-slate-300': task.status.id === 9,
                }"
                      class=" inline-flex items-center justify-center md:w-40 text-sm font-medium">
                  {{ task.status.name }}
                </span>
              </div>
              <div class="flex flex-wrap space-x-5">
                <div class="pl-1" @click="modalFormTask = true; getTaskById(task.id); editTask = true; getStatus(); getUsers();">
                  <a class=" pi pi-pencil"></a>
                </div>
                <div v-if="master" class="pl-1 text-red-600" @click="deleteTaskById(task.id);">
                  <a class=" pi pi-trash"></a>
                </div>
              </div>

            </div>
          </template>
          <div class="py-1 md:space-x-2 md:mx-16">
            <span :class="[task.task_date < task.dev_date ? 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300' : 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300']" class="inline-flex items-center justify-center w-40 text-sm font-medium">
              {{ task.task_date < task.dev_date ? 'ATRASO NO INÍCIO' : 'INÍCIO NO PRAZO' }}
            </span>
            <span :class="[task.req_homolog_date < task.homolog_date ? 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300' : 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300']" class=" inline-flex items-center justify-center w-40 text-sm font-medium">
              {{ task.req_homolog_date < task.homolog_date ? 'ATRASO HOMOLOG' : 'HOMOLOG NO PRAZO' }}
            </span>
          </div>
          <div class="pb-18 md:px-16">
            <p class="text-center font-bold md:text-4xl text-gray-600 text-2xl">{{ task.user.name }}</p>

            <div>
              <p class="text-gray-600"><span class="font-bold">Task:</span> #{{ task.id }}</p>
              <p class="text-gray-600"><span class="font-bold">Dat. Lib Dev:</span> {{ task.task_date }}</p>
              <p class="text-gray-600"><span class="font-bold">Dat. Ini. Dev:</span> {{ task.dev_date }}</p>
              <p class="text-gray-600"><span class="font-bold">Dat. Homolog:</span> {{ task.req_homolog_date }}</p>
              <p class="text-gray-600"><span class="font-bold">Dat. Lib. Homolog:</span> {{ task.homolog_date }}</p>
            </div>
            <div class="pl-2 pt-3 flex flex-wrap">
              <p class="text-gray-600 font-bold pt-1 pr-2">Bugs:</p> <a @click="bugListModal = true; getBugsByTask(task.id)" class="cursor-pointer hover:shadow bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white px-4 border border-indigo-500 hover:border-transparent rounded">visualizar</a>
            </div>

            <div class="pl-2 pt-3">
              <p class="text-gray-600 font-bold">Descrição:</p>
              <ScrollPanel style="width: 100%; height: 200px">
                <p >{{task.description}}</p>
              </ScrollPanel>
            </div>
            <div class="pl-2 pb-2 flex flex-wrap pt-14  space-x-2">
              <a v-if="master" @click="modalFormBug = true; getTaskById(task.id); getUsers(); getCategories();" class=" cursor-pointer flex font-semibold hover:shadow bg-transparent hover:bg-amber-500 text-amber-700  hover:text-white px-4 py-1 border border-amber-500 hover:border-transparent rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                </svg>
                 BUG
              </a>

              <a @click="historyModal = true; getHistoryByTask(task.id)" class="cursor-pointer flex font-semibold hover:shadow bg-transparent hover:bg-teal-500 text-teal-700  hover:text-white px-4 py-1 border border-teal-500 hover:border-transparent rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                Histórico
              </a>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>

    <!-- FOOTER  -->

    <div class="inline-flex w-full pb-2">
      <div class="flex-grow" >
        <button @click="getPagination(currentPage - 1)" :class="{'pointer-events-none': currentPage === 1}"
                class="cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-100 shadow dark:shadow-cyan-500/50 bg-indigo-100 hover:bg-indigo-400 text-indigo-800 py-2 px-4 rounded-l">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-cyan-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button @click="getPagination(currentPage + 1)" :class="{'pointer-events-none': currentPage === lastPage}"
                class="cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-gray-100 shadow dark:shadow-cyan-500/50 bg-indigo-100 hover:bg-indigo-400 text-indigo-800 py-2 px-4 rounded-r">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-cyan-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <a v-if="master" @click="modalFormTask = true; editTask = false; getStatus(); getUsers();" class="cursor-pointer ml-auto text-indigo-800 dark:text-cyan-300 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>

import {useSidebarstore} from "@/store/sidebarStore";
import api from "@/main";
import {computed, inject, ref} from "vue";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Divider from 'primevue/divider';
import "primevue/resources/themes/md-light-indigo/theme.css";
import Avatar from 'primevue/avatar';
import ScrollPanel from 'primevue/scrollpanel';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import {decrypt, formatDate} from "@/utils/utils";
import SpeedDial from 'primevue/speeddial';
import FileUpload from 'primevue/fileupload';
import {format} from 'date-fns';
import App from "@/App";

export default {
  name: "Homeview",
  components: {
    App,
    Accordion,
    AccordionTab,
    Divider,
    Avatar,
    ScrollPanel,
    Dialog,
    InputText,
    Textarea,
    Calendar,
    Dropdown,
    SpeedDial,
    FileUpload
  },
  setup() {
    const swal = inject('$swal');
    const tasks = ref([]);
    const totalTasks = ref();
    const currentPage = ref(1);
    const modalFormTask = ref(false);
    const historyModal = ref(false);
    const modalFormBug = ref(false);
    const modalFormPull = ref(false);
    const bugListModal = ref(false);
    const task = ref([]);
    const users = ref([]);
    const status = ref([]);
    const categories = ref([]);
    const history = ref([]);
    const bug = ref([]);
    const pull = ref([]);
    const bugs = ref([]);
    const preview = ref(null);
    const image = ref(null);
    const previewList = ref([]);
    const imageList = ref([]);
    const isMobile = computed(() => window.innerWidth < 768)
    const LoggedUser = decrypt(sessionStorage.getItem('user'), process.env.VUE_APP_ENCRYPT_KEY);
    const master = ref(LoggedUser.profile.id == process.env.VUE_APP_MASTER_PROFILE);
    const tester = ref(LoggedUser.profile.id == process.env.VUE_APP_TESTER_PROFILE);
    const homologDelay = ref();
    const taskDelay = ref();
    const editTask = ref(false);
    const alterDevDate = ref(false);
    const alterTaskDate = ref(false);
    const alterReqHomologDate = ref(false);
    const alterLibHomologDate = ref(false);
    const isDark = ref(computed(() => App.setup().isDark).value);

    const previewMultiImage = (event) => {
      const input = event.target;
      let count = input.files.length;
      let index = 0;
      if (input.files) {
        while (count--) {
          const reader = new FileReader();
          reader.onload = (e) => {
            previewList.value.push(e.target.result);
          };
          imageList.value.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    };

    const reset = () => {
      image.value = null;
      preview.value = null;
      imageList.value = [];
      previewList.value = [];
    };

    function libHomolog(status) {
      if (status == process.env.VUE_APP_STATUS_LIB_HOMOLOG) {
        this.modalFormPull = true
      }
    }

    function getPagination(page) {
      localStorage.setItem('page', page)
      location.reload();
    }

    async function getTasks() {
      const page = localStorage.getItem('page');
      try {
        const resp = await api.get(`/tasks?&limit=5&page=${page}&order_by=-task_date`);
        this.tasks = resp.data.data.data;
        this.totalTasks = resp.data.data.total;
        this.lastPage = resp.data.data.last_page;
        this.currentPage = resp.data.data.current_page;
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

    async function getTasksByUser() {
      const page = localStorage.getItem('page');
      try {
        const resp = await api.get(`/task/user/${LoggedUser.id}?&limit=5&page=${page}`);
        this.tasks = resp.data.data.data;
        this.totalTasks = resp.data.data.total;
        this.lastPage = resp.data.data.last_page;
        this.currentPage = resp.data.data.current_page;
      } catch (e) {
        console.error(e);
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
        }
      }
    }

    async function getTaskById(taskId) {
      try {
        const resp = await api.get(`/task/${taskId}`);
        this.task = resp.data.data;

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
        }
      }
    }

    async function getTasksByStatus(statusId) {
      try {
        const resp = await api.get(`/task/status/${statusId}?&limit=5&page=${page}`);
        this.tasks = resp.data.data.data;
        this.totalTasks = resp.data.data.total;
        this.lastPage = resp.data.data.last_page;
        this.currentPage = resp.data.data.current_page;
      } catch (e) {
        console.error(e);
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
        }
      }
    }

    async function createTask() {

      const devDate = this.task.dev_date && format(this.task.dev_date, 'yyyy-MM-dd') || this.task.dev_date;
      const taskDate = this.task.task_date && format(this.task.task_date, 'yyyy-MM-dd') || this.task.task_date;
      const homologDate = this.task.homolog_date && format(this.task.homolog_date, 'yyyy-MM-dd') || this.task.homolog_date;
      const reqHomologDate = this.task.req_homolog_date && format(this.task.req_homolog_date, 'yyyy-MM-dd') || this.task.req_homolog_date;

      try {
        const resp = await api.post(`/task`, {
          user_id: this.task.user.id,
          status_id: this.task.status.id,
          title: this.task.title,
          description: this.task.description,
          dev_date: devDate,
          task_date: taskDate,
          homolog_date: homologDate,
          req_homolog_date: reqHomologDate,
        });
        this.modalFormTask = false;
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

    async function updateTask(taskId) {

      try {
        const resp = await api.put(`/task/${taskId}`, {
          user_id: this.task.user.id,
          status_id: this.task.status.id,
          title: this.task.title,
          description: this.task.description,
          dev_date: this.task.dev_date && formatDate(this.task.dev_date) || this.task.dev_date,
          task_date: this.task.task_date && formatDate(this.task.task_date) || this.task.task_date,
          homolog_date: this.task.homolog_date && formatDate(this.task.homolog_date) || this.task.homolog_date,
          req_homolog_date: this.task.req_homolog_date && formatDate(this.task.req_homolog_date) || this.task.req_homolog_date,
        });
        this.modalFormTask = false;
        swal({
          imageUrl: 'https://media.giphy.com/media/bzE1WAm8BifiE/giphy.gif',
          imageWidth: 150,
          imageHeight: 150,
          title: 'Yeah!!!...',
          text: 'Atualizado com sucesso!',
        }).then((result) => {
          location.reload();
        });
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
            window.location.href = "/login";
          });
        }
      }
    }

    async function deleteTaskById(taskId) {
      swal({
        imageUrl: 'https://media.giphy.com/media/pPhyAv5t9V8djyRFJH/giphy.gif',
        imageWidth: 150,
        imageHeight: 150,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete?'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            api.delete(`/task/${taskId}`)
                .then(() => {
                  swal(
                      'Deletada!',
                      'A tarefa foi deletada!',
                      'success'
                  ).then(() => {
                    location.reload();
                  })

                })
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
                window.location.href = "/login";
              });
            }
            if (e.response.status === 200) {
              console.error(e);

            }
          }
        }
      });
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

    async function getStatus() {
      try {
        const resp = await api.get(`/status`);
        this.status = resp.data.data.data;
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

    async function getCategories() {
      try {
        const resp = await api.get(`/categories`);
        this.categories = resp.data.data.data;
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

    async function getHistoryByTask(taskId) {
      try {
        const resp = await api.get(`/history/task/${taskId}`);
        this.history = resp.data.data.data;
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

    async function getBugsByTask(taskId) {
      try {
        const resp = await api.get(`/bug/task/${taskId}`);
        this.bugs = resp.data.data.data;
        if (this.bugs.length === 0) {
          this.bugListModal = false
          swal({
            imageUrl: 'https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            title: 'Sem BUGS reportados!',
          })
        }
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

    async function getBugById(bugId) {
      try {
        const resp = await api.get(`/bug/${bugId}`);
        this.bug = resp.data.data;
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

    async function createBug() {

      const formData = new FormData();
      formData.append('task_id', this.task.id);
      formData.append('user_id', this.task.user.id);
      formData.append('category_id', this.bug.category.id);
      formData.append('title', this.bug.title);
      formData.append('tests', this.bug.tests);
      formData.append('description', this.bug.description);
      formData.append('image', this.bug.image);

      try {
        const resp = await api.post(`/bug`, formData , {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.modalFormBug = false;
        console.log(resp.data);
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

    async function updateBug(bugId) {
      const formData = new FormData();
      formData.append('task_id', this.bug.task_id);
      formData.append('user_id', this.bug.user_id);
      formData.append('category_id', this.bug.category);
      formData.append('title', this.bug.title);
      formData.append('tests', this.bug.tests);
      formData.append('description', this.bug.description);
      formData.append('image', this.bug.image);
      try {
        const resp = await api.put(`/bug/${bugId}`,  {
          task_id: this.bug.task_id,
          user_id: this.bug.user_id,
          category_id: this.bug.category.id,
          title: this.bug.title,
          tests: this.bug.tests,
          description: this.bug.description,
          image: this.bug.image,
        });
        console.log(this.bug.category.id);
        this.modalFormBug = false;
        swal({
          imageUrl: 'https://media.giphy.com/media/bzE1WAm8BifiE/giphy.gif',
          imageWidth: 150,
          imageHeight: 150,
          title: 'Yeah!!!...',
          text: 'Atualizado com sucesso!',
        }).then((result) => {
          location.reload();
        });
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
            window.location.href = "/login";
          });
        }
      }
    }

    async function createPull() {

      try {
        const resp = await api.post(`/pull`,{
          user_id: this.task.user.id,
          task_id: this.task.id,
          link_v2: this.pull.link_v2,
          link_front: this.pull.link_front,
          link_micros: this.pull.link_micros,
        });
        this.modalFormPull = false;
        console.log(resp.data);
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

    return {
      isDark,
      getTasks,
      getBugById,
      getBugsByTask,
      getTaskById,
      getTasksByUser,
      getTasksByStatus,
      getCategories,
      getUsers,
      getStatus,
      updateTask,
      createTask,
      createBug,
      updateBug,
      deleteTaskById,
      getHistoryByTask,
      createPull,
      libHomolog,
      previewMultiImage,
      tasks,
      totalTasks,
      history,
      bug,
      bugListModal,
      bugs,
      currentPage,
      modalFormTask,
      historyModal,
      modalFormBug,
      modalFormPull,
      isMobile,
      task,
      pull,
      users,
      status,
      categories,
      homologDelay,
      taskDelay,
      editTask,
      master,
      tester,
      reset,
      preview,
      image,
      previewList,
      imageList,
      getPagination,
      alterReqHomologDate,
      alterLibHomologDate,
      alterTaskDate,
      alterDevDate
    }
  },

  async mounted() {
    if(this.master || this.tester) {
      this.getTasks();
    } else {
      this.getTasksByUser();
    }
  },

  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = true
  },
}

</script>
<style scoped>
.accordion-custom i span {
  vertical-align: middle;
}

.accordion-custom span {
  margin: 0 0.5rem;
}

.p-accordion p {
  line-height: 1.5;
  margin: 0;
}
</style>