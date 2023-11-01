import Observable from "../infra/observer/Observable";
import Task from "../entity/Task"
export default class TaskList extends Observable {
	tasks: Task[];

	constructor () {
		super();
		this.tasks = [];
	}

	getTotal () {
		return this.tasks.length;
	}

	addTasks (tasks: any) {
		for (const task of tasks.data) {
			this.createTask(task);
		}
	}
	createTask (data: any) {
		const task = new Task(
			data.id,
            data.description,
            data.homolog_date,
            data.req_homolog_date,
            data.title,
            data.user,
            data.status,
			data.task_image,
			data.transfer
		);
		this.tasks.push(task);
		this.notify("add-task", task);
	}

	deleteTask (task: any) {
		this.tasks.splice(this.tasks.indexOf(task), 1);
		this.notify("delete-task", task);
	}
}