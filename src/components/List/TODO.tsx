import { Task, Props } from "../../interfaces";

const TODOListing = ({ tasks, onClick, onDelete }) => {
  const taskList = createTaskList(tasks, onClick, onDelete);

  return (
    <div className="d-flex justify-content-center text-center mt-5 mx-5">
      {/* Lista com os botões */}
      {taskList.length ? (
        <ul className="col-12 col-sm-9 col-md-7 list-group">{taskList}</ul>
      ) : (
        emptyList()
      )}
    </div>
  );
};

const createTaskList = (
  taskList: Task[],
  onClick: (id: number) => void,
  onDelete: (id: number) => void
) =>
  taskList.map((task: Task) => (
    <li
      key={task.id}
      onClick={() => onClick(task.id)}
      className="list-group-item list-group-item-action"
    >
      <p
        style={liStyle}
        className={
          "m-0" + (task.isDone === 1 ? " text-decoration-line-through" : "")
        }
      >
        {task.task_name}
        <i
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="bi bi-trash-fill btn btn-outline-danger border-0"
        />
      </p>
    </li>
  ));

const emptyList = () => (
  <div>
    <h3>
      Your list is empty. <i>Great</i> job!
    </h3>
    <img src="src\assets\images\dicaprio_cheers.png" alt="" className="mt-2" />
  </div>
);

const liStyle = {
  cursor: "pointer",
};

export default TODOListing;
