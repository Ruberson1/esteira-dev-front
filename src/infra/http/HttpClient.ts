export default interface HttpClient {
	getById (url: string): Promise<any>;

	getAll (url: string): Promise<any>;

	update (url: string, data: any): Promise<any>;

	create (url: string, data: any): Promise<any>;

	delete (url: string): Promise<any>;
}
