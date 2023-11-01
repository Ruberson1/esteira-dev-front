import HttpClient from "./HttpClient";
import axios from "axios";
import swal from "sweetalert2";
import { encrypt } from "../shared/Utils";
import { useDark } from "@vueuse/core";
import router from "../../drivers/router/app-router";


const isDark = useDark()
const background = isDark.value ? '#1f2937' : '#fff';
const colorText = isDark.value ? '#9ca3af' : '#111827';
const btnCollor = isDark.value ? '#06b6d4' : '#fbbf24';

export default class AxiosAdapter implements HttpClient {

	async getById(url: string): Promise<any> {
		const response = await axios.get(url);
		return response.data.data;
	}

	async create(url: string, data: any): Promise<any> {
		const response = await axios.post(url, data);
		return response.data.data;
	}

	async update(url: string, data: any): Promise<any> {
		const response = await axios.put(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.data.data;
	}

	async getAll(url: string): Promise<any> {
		const getFilters = sessionStorage.getItem('filters');
		const response = await axios.get(url, {
			// @ts-ignore
			params: JSON.parse(getFilters)
		});
		return response.data.data;
	}

	async delete(url: string): Promise<any> {
		const response = await axios.delete(url);
		return response.data;
	}
}
const Toast =  swal.mixin({
	toast: true,
	position: 'top-right',
	iconColor: 'white',
	background: '#a5dc86',
	customClass: {
		popup: 'colored-toast'
	},
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true
})

axios.interceptors.request.use(
	(config) => {
		// exibe a loader antes da requisição ser feita

		swal.fire({
			title: 'Carregando...',
			text: 'Por favor, aguarde...',
			color: colorText,
			background: background,
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

axios.interceptors.response.use(
	(response) => {
		swal.close();
		const urlResponse: any = response.config.url;
		const lastSlashIndex: any = urlResponse.lastIndexOf("/");
		const url: string = urlResponse.substring(lastSlashIndex + 1);

		if(response.status === 200 && url === 'login') {
			const token = response.data.original.token;
			const user = encrypt(response.data.original.user, import.meta.env.VITE_APP_ENCRYPT_KEY);
			sessionStorage.setItem('token', token);
			sessionStorage.setItem('user', user);
			window.location.href = "/"
		}

		if(response.status === 200 && url === 'register') {
			swal.fire({
				icon: 'success',
				title: 'Usuário criado com sucesso',
				text: 'solicite a ativação com seu gestor',
				color: colorText,
				background: background,
				allowOutsideClick: false,
				allowEscapeKey: false,
			}).then((result) => {
				window.location.href = "/login";
			});
		}

		if(response.config.method === 'delete' && response.status === 200) {
			Toast.fire({
				icon: 'success',
				title: 'Success'
			})
			setTimeout(() => {
				swal.close();
			}, 1500);
			return response;
		}

		if(response.config.method === 'put' && response.status === 200) {
			Toast.fire({
				icon: 'success',
				title: 'Success'
			})
			setTimeout(() => {
				swal.close();
				window.location.href = "/tasks";
			}, 1500);
			return response;
		}

		if(response.config.method === 'post' && response.status === 200) {
			Toast.fire({
				icon: 'success',
				title: 'Success'
			})
			setTimeout(() => {
				swal.close();
				window.location.href = "/tasks";
			}, 1500);
			return response;
		}

		if(response.config.method === 'post' && response.status === 201) {
			Toast.fire({
				icon: 'success',
				title: 'Success'
			})
			setTimeout(() => {
				swal.close();
				window.location.href = "/tasks";
			}, 1500);
			return response;
		}

		return response;
	},
	(error) => {
		// Caso ocorra um erro na resposta
		if (error.response.status === 401) {
			swal.fire({
				icon: 'error',
				title: error.response.data.message,
				color: colorText,
				background: background,
				allowOutsideClick: false,
				allowEscapeKey: false,
			}).then((result) => {
				window.location.href = "/login";
			});
		}

		if (error.response.status && error.response.status === 403) {
			swal.fire({
				icon: 'error',
				title: error.response.data.original.error,
				background: background,
				color: colorText,
				allowOutsideClick: false,
				allowEscapeKey: false,
			})
		}
		if (error.response.status && error.response.status === 400) {
			swal.fire({
				icon: 'error',
				title: error.response.data.error_message,
				text: formatErrorMessages(error.response.data.error_description),
				color: colorText,
				confirmButtonColor: btnCollor,
				background: background,
				allowOutsideClick: false,
				allowEscapeKey: false,
			})
		}




		// swal.close();

		return Promise.reject(error);
	},
);

const publicRoutes = ['/login', '/register']; // lista de rotas públicas
axios.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token');
		if (token && !publicRoutes.includes(<string>config.url)) { // verifica se a rota é privada
			// @ts-ignore
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

function formatErrorMessages(errors: any) {
	let messages = [];

	for (let field in errors) {
		if (errors.hasOwnProperty(field)) {
			messages.push(errors[field][0]);
		}
	}

	return messages.join('\n');
}

