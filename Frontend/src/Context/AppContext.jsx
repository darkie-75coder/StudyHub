import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  async function toggleTask(id) {
    try {
      const { data } = await axios.patch(
        `https://studyhub-1ln4.onrender.com/api/task/toggle/${id}`,
      );

      toast.success("Task Updated ✅");

      getTasks();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getUser() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/auth/get-user",
      );

      setUser(data.user);
    } catch (err) {}
  }

  async function getSubjects() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/subject/get-subjects",
      );

      setSubjects(data.subjects);
    } catch (err) {}
  }

  async function getTasks() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/task/get-tasks",
      );

      setTasks(data.tasks);
    } catch (err) {}
  }

  async function getNotes() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/note/get-notes",
      );

      setNotes(data.notes);
    } catch (err) {}
  }

  async function auth() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/auth/auth-user",
      );

      await getUser();
      await getSubjects();
      await getTasks();
      await getNotes();

      navigate("/dashboard");
    } catch (err) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    auth();
  }, [loggedIn]);

  const values = {
    loggedIn,
    setLoggedIn,
    user,
    auth,
    notes,
    setNotes,
    getNotes,
    loading,
    subjects,
    setSubjects,
    getSubjects,
    tasks,
    getTasks,
    setTasks,
    toggleTask,
  };

  //prettier-ignore
  return (
          <AppContext.Provider value={values}>
              {loading ? <Loader /> : children}
          </AppContext.Provider>
      )
};

export default AppProvider;
