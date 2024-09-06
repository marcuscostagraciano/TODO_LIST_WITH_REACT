import { v4 as uuidv4 } from "uuid";
import { BaseSyntheticEvent, useEffect, useState } from "react";

import Inputs from "./Inputs";
import TODOListing from "./List/TODO";
import { Task } from "../interfaces";

const TODOBody = () => {
  const [taskList, setTaskList] = useState(OGTaskList);
  // const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch("http://localhost/todo_list_api/")
      .then((res) => res.json())
      .then((a) => setTaskList(a));
  }, []);

  const [task, setTask] = useState("");

  const handleOnChange = (e: BaseSyntheticEvent) => {
    // Da própria documentação
    // https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
    setTask(e.target.value);
  };

  const handleButtonSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (task) {
      setTaskList([
        ...taskList,
        {
          id: uuidv4(),
          task_name: task,
          isDone: false,
        },
      ]);
      setTask("");
    }
  };

  const handleTodoToggle = (id: string) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleTodoDeleteTask = (id: string) => {
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

let OGTaskList: Task[] = [
  {
    id: uuidv4(),
    task_name: "Start React",
    isDone: true,
  },
  {
    id: uuidv4(),
    task_name: "Make a TODO List",
    isDone: false,
  },
  {
    id: uuidv4(),
    task_name: "Give up",
    isDone: false,
  },
  {
    id: uuidv4(),
    task_name: 'Use the "useEffect()"',
    isDone: false,
  },
  {
    id: uuidv4(),
    task_name: "Learn tax evasion (/s)",
    isDone: false,
  },
  {
    id: uuidv4(),
    task_name: "Create a backlog",
    isDone: false,
  },
];

export default TODOBody;
