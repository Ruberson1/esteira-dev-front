import Observable from "../infra/observer/Observable";
import Category from "../entity/Category"
export default class CategoryList extends Observable {
	categories: Category[];

	constructor () {
		super();
		this.categories = [];
	}

	getTotal () {
		return this.categories.length;
	}

	addCategory (categories: any) {
		for (const category of categories.data) {
			this.createCategory(category);
		}
	}

	createCategory (data: any) {
		const category = new Category(
			data.id,
			data.name,
		);
		this.categories.push(category);
		this.notify("add-category", category);
	}
}