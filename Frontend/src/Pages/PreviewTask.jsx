import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { BiTask, BiTrash } from "react-icons/bi";
import { IoTime } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const PreviewTask = () => {
  const { id } = useParams();

  const { toggleTask, tasks, setTasks } = useContext(AppContext);

  const navigate = useNavigate();

  const [task, setTask] = useState({});

  async function deleteTask(id) {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/task/delete/${id}`,
      );

      toast.success(data.message);

      setTasks(tasks.filter((tas) => tas._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getTask() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/task/getTask/${id}`,
      );

      setTask(data.task);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="sub-box">
      <Sidebar />
      <div className="sub-content">
        <div className="top-nav">
          <h1
            onClick={() => {
              navigate("/tasks");
            }}
          >
            Tasks
          </h1>
          <button
            className="create-btn"
            onClick={() => {
              navigate("/createTask");
            }}
          >
            <GoPlus className="plus-icon" /> <p>Add Task</p>
          </button>
        </div>
        <div className="task-desc">
          <div className="head-task">
            <h1>
              <BiTask className="task-icon" />
              {task.title}
            </h1>
          </div>
          <div className="sub-task">
            <h1>Work</h1>
            <h2>{task.description}</h2>
          </div>
          <div className="prev-task-btns">
            <button
              onClick={() => {
                navigate("/tasks");
              }}
              className="drrdrdrdrd"
            >
              Cancel
            </button>
            {task.status === "pending" ? (
              <button
                className="c-t-s"
                onClick={() => {
                  toggleTask(id);

                  navigate("/tasks");
                }}
              >
                Mark as completed <FaCircleCheck />
              </button>
            ) : (
              <button
                className="p-t-s"
                onClick={() => {
                  toggleTask(id);

                  navigate("/tasks");
                }}
              >
                Mark as pending <IoTime />
              </button>
            )}
            <button
              className="del-task-prev"
              onClick={() => {
                deleteTask(id);
                navigate("/tasks");
              }}
            >
              Delete Task <BiTrash style={{ fontSize: "25px" }} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTask;
