import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { AppContext } from "../Context/AppContext";
import { IoMdCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import DeleteBox from "../Components/DeleteBox";

const Tasks = () => {
  const navigate = useNavigate();

  const { tasks, setTasks, subjects, toggleTask } = useContext(AppContext);

  const [showWarn, setShowWarn] = useState(null);

  async function deleteTask(id) {
    try {
      const { data } = await axios.delete(
        `https://studyhub-1ln4.onrender.com/api/task/delete/${id}`,
      );

      toast.success(data.message);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  }

  function getSubject(id) {
    try {
      const subject = subjects.find((sub) => sub._id === id);

      return subject.name;
    } catch (err) {
      toast.error(err.message);
    }
  }

  const [pend, setPend] = useState(false);
  const [comp, setComp] = useState(false);
  const [all, setAll] = useState(true);

  return (
    <div className="sub-box">
      <Sidebar />
      <div className="sub-content">
        <div className="top-nav">
          <h1>Tasks</h1>
          <button
            className="create-btn"
            onClick={() => {
              navigate("/createTask");
            }}
          >
            <GoPlus className="plus-icon" /> <p>Add Task</p>
          </button>
        </div>

        <div className="task-cat">
          <div
            className={all ? "active opt" : "opt"}
            onClick={() => {
              if (!all) {
                setAll(true);
                setPend(false);
                setComp(false);
              }
            }}
          >
            <h2>All</h2>
          </div>
          <div
            className={pend ? "active opt" : "opt"}
            onClick={() => {
              if (!pend) {
                setPend(true);
                setAll(false);
                setComp(false);
              }
            }}
          >
            <h2>Pending</h2>
          </div>
          <div
            className={comp ? "active opt" : "opt"}
            onClick={() => {
              if (!comp) {
                setComp(true);
                setAll(false);
                setPend(false);
              }
            }}
          >
            <h2>Completed</h2>
          </div>
        </div>

        {pend &&
          (showWarn ? (
            <DeleteBox
              text="Task"
              fnc={deleteTask}
              set={setShowWarn}
              id={showWarn}
            />
          ) : (
            <div className="tasks">
              {tasks
                .filter((task) => task.status === "pending")
                .map((task) => {
                  return (
                    <div className="task">
                      <div>
                        <MdCheckBoxOutlineBlank className="boxr" />
                        <div
                          onClick={() => {
                            toggleTask(task._id);
                          }}
                        >
                          <h1>{task.title}</h1>
                          <span>
                            {getSubject(task.subject)} | Due{" "}
                            {new Date(task.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="task-btns">
                        <button
                          onClick={() => {
                            navigate(`/previewTask/${task._id}`);
                          }}
                        >
                          View Task
                        </button>
                        <button
                          onClick={() => {
                            setShowWarn(task._id);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}

        {comp &&
          (showWarn ? (
            <DeleteBox
              text="Task"
              fnc={deleteTask}
              set={setShowWarn}
              id={showWarn}
            />
          ) : (
            <div className="tasks">
              {tasks
                .filter((task) => task.status === "completed")
                .map((task) => {
                  return (
                    <div className="task">
                      <div>
                        <IoMdCheckbox className="checked-box boxr" />
                        <div
                          onClick={() => {
                            toggleTask(task._id);
                          }}
                        >
                          <h1>{task.title}</h1>
                          <span>
                            {getSubject(task.subject)} | Due{" "}
                            {new Date(task.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="task-btns">
                        <button
                          onClick={() => {
                            navigate(`/previewTask/${task._id}`);
                          }}
                        >
                          View Task
                        </button>
                        <button
                          onClick={() => {
                            setShowWarn(task._id);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}

        {all &&
          (showWarn ? (
            <DeleteBox
              text="Task"
              fnc={deleteTask}
              set={setShowWarn}
              id={showWarn}
            />
          ) : (
            <div className="tasks">
              {tasks.map((task) => {
                return (
                  <div className="task">
                    <div>
                      {task.status === "completed" ? (
                        <IoMdCheckbox className="checked-box boxr" />
                      ) : (
                        <MdCheckBoxOutlineBlank className="boxr" />
                      )}

                      <div
                        onClick={() => {
                          toggleTask(task._id);
                        }}
                      >
                        <h1>{task.title}</h1>
                        <span>
                          {getSubject(task.subject)} | Due{" "}
                          {new Date(task.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="task-btns">
                      <button
                        onClick={() => {
                          navigate(`/previewTask/${task._id}`);
                        }}
                      >
                        View Task
                      </button>
                      <button
                        onClick={() => {
                          setShowWarn(task._id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tasks;
