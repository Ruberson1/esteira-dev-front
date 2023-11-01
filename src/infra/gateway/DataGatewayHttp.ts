import Gateway from "./Gateway";
import HttpClient from "../http/HttpClient";

export default class DataGatewayHttp implements Gateway {

	constructor (
		readonly httpClient: HttpClient,
		readonly baseUrl: string,
	) {
	}

	async create(path: string, data: any): Promise<any> {
		return await this.httpClient.create(`${this.baseUrl}/${path}`, data);
	}

	async delete(path: string): Promise<any> {
		return await this.httpClient.delete(`${this.baseUrl}/${path}`);
	}

	async getAll(path: string): Promise<any> {
		return await this.httpClient.getAll(`${this.baseUrl}/${path}`);
	}

	async getById(path: string): Promise<any> {
		return await this.httpClient.getById(`${this.baseUrl}/${path}`);
	}

	async update(path: string, data: any): Promise<any> {
		return await this.httpClient.update(`${this.baseUrl}/${path}`, data);
	}

}