import Observable from "../infra/observer/Observable";
import Dash from "../entity/Dash"
export default class DashList extends Observable {
	dashs: Dash[]
	constructor () {
		super();
		this.dashs = [];
	}

	createDash (data: any) {

		const dash = new Dash(data);
		this.dashs.push(dash);
		this.notify("add-dash", dash);
	}
}