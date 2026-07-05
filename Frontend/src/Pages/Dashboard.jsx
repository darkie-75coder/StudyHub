import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { AppContext } from "../Context/AppContext";
import { LuBookText } from "react-icons/lu";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

import { toast } from "react-toastify";

import axios from "axios";

const Dashboard = () => {
  const { user, tasks, subjects, notes, toggleTask, loggedIn } =
    useContext(AppContext);

  const [checked, setChecked] = useState(null);

  function getSubject(id) {
    const subject = subjects.find((sub) => sub._id === id);
    return subject ? subject.name : "";
  }

  const navigate = useNavigate();

  const [pendTask, setPendTask] = useState(0);
  const [compTasks, setCompTasks] = useState(0);
  const sub = subjects?.length || 0;
  const count_notes = notes?.length || 0;

  function calc_pending_tasks() {
    let count = 0;

    tasks.forEach((task) => {
      if (task.status === "pending") {
        count++;
      }
    });

    setPendTask(count);
  }

  function calc_completed_tasks() {
    let count = 0;

    tasks.forEach((task) => {
      if (task.status === "completed") {
        count++;
      }
    });

    setCompTasks(count);
  }

  useEffect(() => {
    if (loggedIn) {
      calc_pending_tasks();
      calc_completed_tasks();
    } else {
      navigate("/");
      toast.error("You are not logged In ❌");
    }
  }, [loggedIn]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dash-content">
        <div className="top-nav dash-nav">
          <h1>
            <GoHome className="lulisodnewnfioe" /> Dashboard
          </h1>
        </div>
        <h2 className="head">Welcome back, {user.username}! 👋 </h2>
        <span>Let's make today productive.</span>
        <div className="dash-boxes">
          <div className="box">
            <div className="left">
              <h1>{sub}</h1>
              <h2>Subjects</h2>
            </div>
            <div className="right">
              <LuBookText className="crs" />
            </div>
          </div>
          <div className="box">
            <div className="left">
              <h1>{compTasks}</h1>
              <h2>Tasks Completed</h2>
            </div>
            <div className="right">
              <MdOutlineTaskAlt className="crs" />
            </div>
          </div>
          <div className="box">
            <div className="left">
              <h1>{pendTask}</h1>
              <h2>Pending Tasks</h2>
            </div>
            <div className="right">
              <MdAccessTime className="crs" />
            </div>
          </div>
          <div className="box">
            <div className="left">
              <h1>{count_notes}</h1>
              <h2>Notes</h2>
            </div>
            <div className="right">
              <LuNotebookPen className="crs" />
            </div>
          </div>
        </div>
        <div className="upcoming-tasks">
          <h1>Upcoming Tasks</h1>
          <div
            className="up-task"
            onClick={() => {
              navigate("/tasks");
            }}
          >
            {tasks
              .filter((task) => task.status === "pending")
              .map((task) => {
                return (
                  <div className="u-t" key={task._id}>
                    <label className="custom-check">
                      <MdCheckBoxOutlineBlank className="u-icons" />
                      <div className="u-t-t">
                        {task.title}
                        <span>{getSubject(task.subject)}</span>
                      </div>
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
