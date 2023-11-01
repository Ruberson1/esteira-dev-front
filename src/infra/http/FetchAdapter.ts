import HttpClient from "./HttpClient";

export default class FetchAdapter implements HttpClient {

	async create(url: string, data: any): Promise<any> {
		return Promise.resolve(undefined);
	}

	async delete(url: string): Promise<any> {
		return Promise.resolve(undefined);
	}

	async getAll(url: string): Promise<any> {
		const getFilters = sessionStorage.getItem('filters');
		const response = await fetch(url);
		return response.json();
	}

	async getById(url: string): Promise<any> {
		return Promise.resolve(undefined);
	}

	async update(url: string, data: any): Promise<any> {
		return Promise.resolve(undefined);
	}

}
