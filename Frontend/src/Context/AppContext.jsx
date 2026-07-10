import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getSubjects() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/subject/get-subjects",
      );

      setSubjects(data.subjects);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function getTasks() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/task/get-tasks",
      );

      setTasks(data.tasks);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getNotes() {
    try {
      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/note/get-notes",
      );

      setNotes(data.notes);
    } catch (err) {
      nav;
      toast.error(err.message);
    }
  }

  useEffect(() => {
    async function auth() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://studyhub-1ln4.onrender.com/api/auth/auth-user",
        );

        await setLoggedIn(true);

        await getUser();
        await getSubjects();
        await getTasks();
        await getNotes();
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    auth();
  }, [loggedIn]);

  const values = {
    loggedIn,
    setLoggedIn,
    user,
    notes,
    setNotes,
    getNotes,
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
