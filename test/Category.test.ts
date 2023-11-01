import Category from "../src/entity/Category";

test("Should create a category", function () {
	const id = 1;
	const name = 'PROD';

	const status = new Category(id, name);

	expect(status.id).toBe(id);
	expect(status.name).toBe(name);
});

