interface Task {
  id: number;
  task_name: string;
  isDone: boolean;
}

interface Props {
  task?: Task;
  tasks?: Task[];
  onChange?: Function;
  onSubmit?: Function;
}

export type { Task, Props };
