import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const CreateTask = () => {
  const { subjects, getTasks } = useContext(AppContext);

  const navigate = useNavigate();

  const [color, setColor] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");

  async function Handler(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://studyhub-1ln4.onrender.com/api/task/create",
        {
          title,
          description,
          subject,
        },
      );

      toast.success(data.message);
      await getTasks();
      navigate("/tasks");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="form-box" onSubmit={Handler}>
      <form>
        <div className="head">
          <MdOutlinePlaylistAdd
            className="form-icon"
            style={{ background: "#22C55E36", color: "#22C55E" }}
          />
          <div className="form-txt">
            <h1>Add New Task</h1>
            <p>Create a new task or homework</p>
          </div>
        </div>
        <div className="inp-box">
          <h2>Task Title</h2>
          <input
            type="text"
            placeholder="Enter task title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </div>
        <div className="inp-box">
          <h2>Task Description</h2>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            rows="7"
            cols="45"
            placeholder="Enter work to be done in task"
            required
          ></textarea>
        </div>
        <div className="inp-box">
          <h2>Subject</h2>
          <select
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            value={subject}
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => {
              return (
                <option value={sub._id} key={sub._id}>
                  {sub.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="submit-btns">
          <button
            type="button"
            onClick={() => {
              navigate("/tasks");
            }}
          >
            Cancel
          </button>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
