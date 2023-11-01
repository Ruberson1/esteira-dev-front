import User from "../src/entity/User";


test("Should create a user", function () {
	const id = 1;
	const image = 'profile_picture.jpg';
	const name = 'John Doe';
	const profile = 'developer';
	const email = 'john.doe@example.com';
	const active = true;

	const user = new User(id, image, name, profile, email, active);

	expect(user.id).toBe(id);
	expect(user.image).toBe(image);
	expect(user.name).toBe(name);
	expect(user.profile).toBe(profile);
	expect(user.email).toBe(email);
	expect(user.active).toBe(active);
});

