import React, { useContext } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { AppContext } from "../Context/AppContext";

const DeleteBox = (props) => {
  const { setSubjects } = useContext(AppContext);

  return (
    <div className="del-box">
      <div className="del-dial-box">
        <IoWarningOutline className="warn-del" />
        <h1>Are you sure do you want to delete this {props.text} ?</h1>
        <div className="del-opt">
          <button
            onClick={() => {
              props.set(null);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.fnc(props.id);

              props.set(null);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBox;
