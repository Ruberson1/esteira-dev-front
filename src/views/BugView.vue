<template>
  <div class="flex h-screen items-center justify-center">
    <h1 class="text-9xl text-center">
      BUG
    </h1>
  </div>
</template>

<script>
import {useSidebarstore} from "@/store/sidebarStore";

export default {
  name: "BugView",
  setup() {
  },
  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = true
  }
}
</script>

<style scoped>

</style>