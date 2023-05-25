import { defineStore } from 'pinia'

export const useSidebarstore = defineStore('sidebar',{
    state: () => ({
        isSidebarVisible: true
    })
})