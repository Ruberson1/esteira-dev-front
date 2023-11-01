import Observable from "../infra/observer/Observable";
import User from "../entity/User"
export default class UserList extends Observable {
	users: User[];

	constructor () {
		super();
		this.users = [];
	}

	getTotal () {
		return this.users.length;
	}

	addUsers (users: any) {
		for (const user of users.data) {
			this.createUser(user);
		}
	}

	createUser (data: any) {
		const user = new User(
			data.id,
			data.image,
			data.name,
			data.profile,
			data.email,
            data.active
		);
		this.users.push(user);
		this.notify("add-history", user);
	}

}