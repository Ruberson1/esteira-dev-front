import Bug from "../src/entity/Bug";

test("Deve criar um Bug", function () {
	const id = 1;
	const task = { id: 1, title: 'Sample Task' };
	const category = { id: 1, name: 'Sample Task' };
	const title = 'Sample Bug Title';
	const tests = 'Steps to reproduce...';
	const description = 'Bug description...';
	const imageBug = 'bug_screenshot.jpg';
	const production = false;

	const bug = new Bug(
		id,
		task,
		category,
		title,
		tests,
		description,
		imageBug,
		production
	);

	expect(bug.id).toBe(id);
	expect(bug.task).toBe(task);
	expect(bug.category).toBe(category);
	expect(bug.title).toBe(title);
	expect(bug.tests).toBe(tests);
	expect(bug.description).toBe(description);
	expect(bug.image_bug).toBe(imageBug);
	expect(bug.production).toBe(production);
});

test("Deve criar um Bug em produção", () => {

	// Given/Arrange:
	const id = 1;
	const task = { id: 1, title: 'Sample Task' };
	const category = 'UI';
	const title = 'Sample Bug Title';
	const tests = 'Steps to reproduce...';
	const description = 'Bug description...';
	const imageBug = 'bug_screenshot.jpg';
	const production = true;

	// When/Act:
	const bug = new Bug(
		id,
		task,
		category,
		title,
		tests,
		description,
		imageBug,
		production
	);
	// Then/Assert:
	expect(bug.production).toBe(true);
});