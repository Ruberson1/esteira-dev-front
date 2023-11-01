import Status from "../src/entity/Status";

test("Deve criar um Status", function () {
	const id = 1;
	const name = 'PROD';

	const status = new Status(id, name);

	expect(status.id).toBe(id);
	expect(status.name).toBe(name);
});

