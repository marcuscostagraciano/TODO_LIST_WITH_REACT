interface Task {
  id: number;
  task_name: string;
  // API retorna '0' ou '1'
  isDone: boolean | number;
}

interface Props {
  task?: Task;
  tasks?: Task[];
  onChange?: Function;
  onSubmit?: Function;
}

export type { Task, Props };
