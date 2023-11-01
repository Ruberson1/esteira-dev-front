import Observable from "../infra/observer/Observable";
import Status from "../entity/Status"
export default class StatusList extends Observable {
	statuses: Status[];

	constructor () {
		super();
		this.statuses = [];
	}

	getTotal () {
		return this.statuses.length;
	}

	addStatus (statuses: any) {
		for (const status of statuses.data) {
			this.createStatus(status);
		}
	}

	createStatus (data: any) {
		const status = new Status(
			data.id,
			data.name,
		);
		this.statuses.push(status);
		this.notify("add-status", status);
	}

}