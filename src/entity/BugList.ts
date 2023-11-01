import Observable from "../infra/observer/Observable";
import Bug from "../entity/Bug"
export default class BugList extends Observable {
	bugs: Bug[];

	constructor () {
		super();
		this.bugs = [];
	}

	getTotal () {
		return this.bugs.length;
	}

	addBugs (bugs: any) {
		for (const bug of bugs.data) {
			this.createBug(bug);
		}
	}

	createBug (data: any) {
		const bug = new Bug(
			data.id,
			data.task,
			data.category,
			data.title,
			data.tests,
			data.description,
			data.image_bug,
			data.production
		);
		this.bugs.push(bug);
		this.notify("add-Bug", bug);
	}

	deleteBug (bug: any) {
		this.bugs.splice(this.bugs.indexOf(bug), 1);
		this.notify("delete-bug", bug);
	}
}