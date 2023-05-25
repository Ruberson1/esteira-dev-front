import { defineStore } from 'pinia'
import axios from "axios";

export const useAuthSocialStore = defineStore({
    id: 'authSocial',
    state: () => ({
        token: null
    }),
    actions: {
        async loginSocial(provider) {
            console.log(provider)
            try {
                const response = await axios.get(`http://licitanet-apidevs.com/login/${provider}`)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                this.token = response.data.token
                // redirecionar para a página após login bem sucedido
            } catch (error) {
                console.error(error)
            }
        }
    }
})