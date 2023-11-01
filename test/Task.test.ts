import Task from "../src/entity/Task";

test("Deve criar uma task", function () {
	const id = 1;
	const description = 'Sample description';
	const homologDate = new Date('2023-08-30');
	const reqHomologDate = new Date('2023-09-15');
	const title = 'Sample title';
	const user = { id: 1, name: 'John Doe' };
	const status = 'Pending';
	const taskImage = 'sample_image.jpg';
	const transfer = false;

	const task = new Task(
		id,
		description,
		homologDate,
		reqHomologDate,
		title,
		user,
		status,
		taskImage,
		transfer
	);

	expect(task.id).toBe(id);
	expect(task.description).toBe(description);
	expect(task.homolog_date).toBe(homologDate);
	expect(task.req_homolog_date).toBe(reqHomologDate);
	expect(task.title).toBe(title);
	expect(task.user).toBe(user);
	expect(task.status).toBe(status);
	expect(task.task_image).toBe(taskImage);
	expect(task.transfer).toBe(transfer);
});