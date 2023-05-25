import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import axios from 'axios';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import swal from "sweetalert2";

import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import './styles/app.css';

const pinia = createPinia();
const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');


const api = axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
    timeout: 5000,
    crossdomain: true,
});


// Configuração do interceptor do axios
const publicRoutes = ['/login', '/register']; // lista de rotas públicas
api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token && !publicRoutes.includes(config.url)) { // verifica se a rota é privada
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
api.interceptors.request.use(
    (config) => {
        // exibe a loader antes da requisição ser feita
        swal.fire({
            title: 'Carregando...',
            text: 'Por favor, aguarde...',
            imageUrl: 'https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            background: '#fff',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                swal.showLoading();
            }
        });
        return config;
    },
    (error) => {
        // Caso ocorra um erro na requisição
        swal.close();

        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        // Remove a loader após a resposta ser recebida
        swal.close();

        return response;
    },
    (error) => {
        // Caso ocorra um erro na resposta
        swal.close();

        return Promise.reject(error);
    },
);

export default api;



