export default class History {
	private task: any;
	private history_date: string;
	private status: any;
	private user: any


	constructor (
		task: any,
		history_date: string,
		status: any,
		user: any
	) {
		this.task = task;
		this.history_date = history_date;
		this.status = status;
		this.user = user;
	}
}
