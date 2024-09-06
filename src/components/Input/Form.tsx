const InputForm = ({ task, onChange, onSubmit }) => {
  return (
    <>
      <form className="input-group" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="New Task"
          value={task}
          name="todoInput"
          autoFocus={true}
          onChange={onChange}
        />
        <button
          disabled={!task}
          type="submit"
          className={
            "submit-button btn btn-outline-" + (task ? "success" : "secondary")
          }
        >
          Add task
        </button>
      </form>
    </>
  );
};

export default InputForm;
