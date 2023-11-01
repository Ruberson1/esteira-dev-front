import { defineStore } from 'pinia'

export const useGlobalComponentsStore = defineStore('global-components',{
    state: () => ({
        isVisible: true
    })
})