// import InputBtn from "./Input/Button";
import InputForm from "./Input/Form";

const Inputs = ({ task, onChange, onSubmit }) => {
  return (
    <div className="d-flex align-content-center justify-content-center">
      <div className="col-9 col-sm-8 col-md-6">
        <InputForm task={task} onChange={onChange} onSubmit={onSubmit} />
      </div>
      {/* <div className="col">
        <InputBtn />
      </div> */}
    </div>
  );
};

export default Inputs;
