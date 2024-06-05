import { defineStore } from 'pinia'
import { ref } from 'vue'

let initialSettings = {
    basicUrl: "",
    apiKey: "",
}
export const initSettings = (basicUrl : any, apiKey: any) => {
    initialSettings.basicUrl = basicUrl
    initialSettings.apiKey = apiKey
}

export const useAuthStore = defineStore("authSettings", () => {
    const basicUrl = ref(initialSettings.basicUrl)
    const apiKey = ref(initialSettings.apiKey)
    return {
        basicUrl, apiKey
    }
})