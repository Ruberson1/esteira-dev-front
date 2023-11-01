export default class Task {
	id: number;
	description: string;
	homolog_date: Date;
	req_homolog_date: Date;
	title: string;
	user: any;
	status: any;
	task_image: any;
	transfer: boolean;

	constructor (
		id: number,
		description: string,
		homolog_date : Date,
		req_homolog_date : Date,
		title: string,
		user: any,
		status: any,
		task_image: any,
		transfer: boolean
	) {
		this.id = id;
		this.description = description;
		this.homolog_date = homolog_date;
		this.req_homolog_date = req_homolog_date;
		this.title = title;
		this.user = user;
		this.status = status;
		this.task_image = task_image;
		this.transfer = transfer;
	}
}
