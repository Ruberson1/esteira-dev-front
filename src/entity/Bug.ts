export default class Bug {
	id: number;
	task: any;
	category: any;
	title: string;
	tests: string;
	description: string;
	image_bug: any;
	production: boolean;

	constructor (
		id: number,
		task: any,
		category: any,
		title: string,
		tests: string,
		description: string,
		image_bug: any,
		production: boolean
	) {
		this.id = id;
		this.task = task;
		this.category = category;
		this.title = title;
		this.tests = tests;
		this.description = description;
		this.image_bug = image_bug;
		this.production = production;
	}

}
