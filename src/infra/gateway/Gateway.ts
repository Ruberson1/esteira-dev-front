export default interface Gateway {
	getAll (path: string): Promise<any>;

	getById ( path: string): Promise<any>;

	update (path: string, data: any): Promise<any>;

	delete (path: string): Promise<any>;

	create (path: string, data: any): Promise<any>;
}
