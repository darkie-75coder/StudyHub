import React, { useContext, useState } from "react";
import { FaRegNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Components/Loader";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { subjects, getNotes } = useContext(AppContext);

  async function Handler(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://studyhub-1ln4.onrender.com/api/note/create",
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-box" onSubmit={Handler}>
      {loading ? (
        <Loader />
      ) : (
        <form>
          <div className="head">
            <FaRegNoteSticky
              className="form-icon"
              style={{ background: "#F59E0B36", color: "#F59E0B" }}
            />
            <div className="form-txt">
              <h1>Add New Note</h1>
              <p>Write and save your important notes</p>
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
            <button type="submit">Add Note</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateNote;
