import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import AxiosAdapter from './infra/http/AxiosAdapter';
import FetchAdapter from './infra/http/FetchAdapter';
import router from "./drivers/router/app-router";
import DataGatewayHttp from "./infra/gateway/DataGatewayHttp";
import PrimeVue from "primevue/config";
// @ts-ignore
import { createPinia } from 'pinia'
import Tailwind from 'primevue/passthrough/tailwind';
import Tooltip from "primevue/tooltip";


const pinia = createPinia()
const app = createApp(App);
const httpClient = new AxiosAdapter();
// const httpClient = new FetchAdapter();
const baseUrl = import.meta.env.VITE_APP_ROOT_API;
const dataGateway = new DataGatewayHttp(httpClient, baseUrl);


app.use(router);
app.use(pinia)
// @ts-ignore
app.use(PrimeVue, { unstyled: false, pt: Tailwind });
app.directive('tooltip', Tooltip);
app.provide("dataGateway", dataGateway);
app.mount('#app');

