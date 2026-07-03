import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { MdOutlineEditNote } from "react-icons/md";

const UpdateNote = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { subjects, getNotes } = useContext(AppContext);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  async function Handler(e) {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/note/update/${id}`,
        {
          title,
          content,
          subject,
        },
      );

      toast.success(data.message);
      await getNotes();
      navigate("/notes");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getNote() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/note/getNote/${id}`,
      );

      setContent(data.note.content);
      setTitle(data.note.title);
      setSubject(data.note.subject);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="form-box" onSubmit={Handler}>
      <form>
        <div className="head">
          <MdOutlineEditNote
            className="form-icon"
            style={{ background: "#A855F736", color: "#A855F7" }}
          />
          <div className="form-txt">
            <h1>Update Note</h1>
            <p>Make changes to your note</p>
          </div>
        </div>
        <div className="inp-box">
          <h2>Note Title</h2>
          <input
            type="text"
            placeholder="Enter note title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </div>
        <div className="inp-box">
          <h2>Note Content</h2>
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
            rows="7"
            cols="45"
            placeholder="Write your note content here"
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
              navigate("/notes");
            }}
          >
            Cancel
          </button>
          <button type="submit">Update Note</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNote;
