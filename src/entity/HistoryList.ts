import Observable from "../infra/observer/Observable";
import History from "../entity/History"
export default class HistoryList extends Observable {
	histories: History[];

	constructor () {
		super();
		this.histories = [];
	}

	getTotal () {
		return this.histories.length;
	}

	addHistories (histories: any) {
		for (const history of histories.data) {
			this.createHistory(history);
		}
	}

	createHistory (data: any) {
		const history = new History(
			data.task,
			data.history_date,
			data.status,
			data.user
		);
		this.histories.push(history);
		this.notify("add-history", history);
	}

}