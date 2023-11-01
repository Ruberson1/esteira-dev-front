import Observable from "../infra/observer/Observable";
import Pagination from "../entity/Pagination"
export default class PaginationShared extends Observable {
	paginations: Pagination[];

	constructor () {
		super();
		this.paginations = [];
	}

	createPagination (data: any) {
		const pagination = new Pagination(
		data.current_page,
		data.first_page_url,
		data.from,
		data.last_page,
		data.last_page_url,
		data.next_page_url,
		data.path,
		data.per_page,
		data.prev_page_url,
		data.to,
		data.total,
		);
		this.paginations.push(pagination);
		this.notify("add-page", pagination);
	}

}