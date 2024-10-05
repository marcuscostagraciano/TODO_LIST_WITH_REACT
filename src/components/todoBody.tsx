import { BaseSyntheticEvent, useEffect, useState } from "react";

import Inputs from "./Inputs";
import TODOListing from "./List/TODO";
import { Task } from "../interfaces";
import { TodoService } from "../services";

const TODOBody = () => {
	const [taskList, setTaskList] = useState<Task[]>([]);
	const [task_name, setTask] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const TodoListFromApi: Task[] = await TodoService.getTodoList();
				setTaskList(TodoListFromApi);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleOnChange = (e: BaseSyntheticEvent) => {
		// Da própria documentação
		// https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
		setTask(e.target.value);
	};

	const handleButtonSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();

		if (task_name) {
			try {
				const newTask = (await TodoService.postTodo(task_name)) as Task;

				setTaskList([
					...taskList,
					{
						...newTask,
					},
				]);
				setTask("");
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleTodoToggle = async (id: number) => {
		try {
			const updatedTaskList = [...taskList];
			const updatedTask = updatedTaskList.find((task) => task.id === id);
			updatedTask!.isDone = Number(!updatedTask!.isDone);

			await TodoService.patchTodo(updatedTask!.id);
			setTaskList(updatedTaskList);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTodoDeleteTask = async (id: number) => {
		await TodoService.deleteTodo(id);
		setTaskList(taskList.filter((task) => task.id !== id));
	};

	return (
		<>
			<Inputs
				task={task_name}
				onChange={handleOnChange}
				onSubmit={handleButtonSubmit}
			/>
			<TODOListing
				tasks={taskList}
				onClick={handleTodoToggle}
				onDelete={handleTodoDeleteTask}
			/>
		</>
	);
};

export default TODOBody;
