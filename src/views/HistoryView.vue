<template>

</template>

<script>
import {useSidebarstore} from "@/store/sidebarStore";
export default {

  name: "HistoryView",
  setup() {

    return {
    }
  },
  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = true
  }
}
</script>

<style scoped>

</style>