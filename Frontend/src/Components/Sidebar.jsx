import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { AppContext } from "../Context/AppContext";
import { GoHome } from "react-icons/go";
import { LuNotebookPen } from "react-icons/lu";
import { LuBookText } from "react-icons/lu";
import { BiTask } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { RxCross1 } from "react-icons/rx";

const Sidebar = (props) => {
  const { setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  async function logout() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/auth/logout",
      );

      setLoggedIn(false);
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sidebar-box">
      {loading ? (
        <Loader />
      ) : (
        <ul className="sidebar">
          <div>
            <li className="logo-img">
              <img src={logo} />
            </li>
            <li
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <GoHome className="icon" /> Dashboard
            </li>
            <li
              onClick={() => {
                navigate("/subjects");
              }}
            >
              <LuBookText className="icon" />
              Subjects
            </li>
            <li
              onClick={() => {
                navigate("/tasks");
              }}
            >
              <BiTask className="icon" />
              Tasks
            </li>
            <li
              onClick={() => {
                navigate("/notes");
              }}
            >
              <LuNotebookPen className="icon" />
              Notes
            </li>
          </div>
          <li className="last-li" onClick={logout}>
            <LuLogOut className="icon" /> Logout
          </li>
          <div
            className="cross-btn"
            onClick={() => {
              props.setShowMenu(false);
            }}
          >
            <RxCross1 />
          </div>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
