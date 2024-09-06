import { BaseSyntheticEvent, useEffect, useState } from "react";

import Inputs from "./Inputs";
import TODOListing from "./List/TODO";
import { Task } from "../interfaces";
import { TodoService } from "../services";

const TODOBody = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState("");

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

    if (task) {
      try {
        const newTask: Task = await TodoService.postTodo(task);
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
      const updatedTaskList = taskList.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );
      const updatedTask = updatedTaskList.find((task) => task.id === id);

      await TodoService.patchTodo(updatedTask!.id, updatedTask!.isDone);
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
        task={task}
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
