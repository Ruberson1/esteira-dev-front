<script setup lang="ts">
import TaskListComponent from "../component/TaskComponents/TaskListComponent.vue";
import { inject, onMounted, reactive } from 'vue';
import Task from '../entity/Task';
import TaskList from '../entity/TaskList';
import Gateway from '../infra/gateway/Gateway';
import Observer from '../infra/observer/Observer';
import PaginationShared from "../entity/PaginationShared";
import PaginationComponent from "../component/AppComponents/PaginationComponent.vue";

const taskList: any = reactive(new TaskList());
const pagination: any = reactive(new PaginationShared());

taskList.on(new Observer("add-task", function (task: Task) {
}));

taskList.on(new Observer("delete-todo", function (task: Task) {
}));
onMounted(async () => {
  const getUrl = sessionStorage.getItem('url')
  const url = getUrl == null ? 'tasks?&limit=7&order_by=-task_date&page=1' : getUrl
  const dataGateway = inject("dataGateway") as Gateway;
  const tasksData = await dataGateway.getAll(url);
  pagination.createPagination(tasksData);
  taskList.addTasks(tasksData);
});


</script>

<template>
  <TaskListComponent :taskList="taskList" />
  <PaginationComponent :pagination="pagination"  />
</template>

<style scoped>

</style>