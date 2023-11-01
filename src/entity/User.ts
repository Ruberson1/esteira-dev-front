export default class User {
	id: any;
	image: any;
	name: string;
	profile: any;
	email: string;
	active: boolean;
	
	constructor (
		id: any,
		image: any,
		name: string,
		profile: any,
		email: string,
        active: boolean,

	) {
		this.id = id;
		this.image = image;
		this.name = name;
		this.profile = profile;
		this.email = email;
		this.active = active;
	}
}
