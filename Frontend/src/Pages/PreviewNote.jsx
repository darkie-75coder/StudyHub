import React, { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
import Sidebar from "../Components/Sidebar";
import { AppContext } from "../Context/AppContext";
import { MdOutlineEdit } from "react-icons/md";

const PreviewNote = () => {
  const { id } = useParams();

  const { notes, setNotes } = useContext(AppContext);

  const [note, setNote] = useState({});

  const navigate = useNavigate();

  async function deleteNote(id) {
    try {
      const { data } = await axios.delete(
        `https://studyhub-1ln4.onrender.com/api/note/delete/${id}`,
      );

      toast.success(data.message);

      setNotes(notes.filter((not) => not._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getNotes() {
    try {
      const { data } = await axios.get(
        `https://studyhub-1ln4.onrender.com/api/note/getNote/${id}`,
      );

      setNote(data.note);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="sub-box">
      <Sidebar />
      <div className="sub-content">
        <div className="top-nav">
          <h1
            onClick={() => {
              navigate("/notes");
            }}
          >
            Notes
          </h1>
          <button
            className="create-btn"
            onClick={() => {
              navigate("/createNote");
            }}
          >
            <GoPlus className="plus-icon" /> <p>Add Note</p>
          </button>
        </div>
        <div className="task-desc">
          <div className="head-task">
            <h1>
              <LuNotebookPen className="task-icon" />
              {note.title}
            </h1>
          </div>
          <div className="sub-task">
            <h1>Note</h1>
            <h2>{note.content}</h2>
          </div>
          <div className="prev-task-btns">
            <button
              onClick={() => {
                navigate("/notes");
              }}
              className="drrdrdrdrd"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                navigate(`/updateNote/${id}`);
              }}
              className="p-t-s"
            >
              Edit Note <MdOutlineEdit className="edrt" />
            </button>
            <button
              className="del-task-prev"
              onClick={() => {
                deleteNote(id);
                navigate("/notes");
              }}
            >
              Delete Note <BiTrash style={{ fontSize: "25px" }} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewNote;
