import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { AppContext } from "../Context/AppContext";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteBox from "../Components/DeleteBox";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Components/Loader";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const Notes = () => {
  const navigate = useNavigate();

  const { notes, setNotes, subjects } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWarn, setShowWarn] = useState(null);

  const colorOptions = ["#6DA5F4", "#6AC385", "#E7C388", "#8881F1"];

  async function deleteNote(id) {
    try {
      setLoading(true);

      const { data } = await axios.delete(
        `https://studyhub-1ln4.onrender.com/api/note/delete/${id}`,
      );

      toast.success(data.message);

      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getSubject(id) {
    const subject = subjects.find((sub) => sub._id === id);

    return subject ? subject.name : "";
  }

  return (
    <div className="sub-box">
      {showMenu && <Sidebar setShowMenu={setShowMenu} />}
      {loading ? (
        <Loader />
      ) : (
        <div className="sub-content">
          <div className="top-nav">
            {showMenu ? (
              <RxCross2
                style={{ fontSize: "30px" }}
                onClick={() => {
                  setShowMenu(false);
                }}
              />
            ) : (
              <LuMenu
                style={{ fontSize: "30px" }}
                onClick={() => {
                  setShowMenu(true);
                }}
              />
            )}
            <h1>Notes</h1>
            <button
              className="create-btn"
              onClick={() => {
                navigate("/createNote");
              }}
            >
              <GoPlus className="plus-icon" /> <p>Add Note</p>
            </button>
          </div>
          {showWarn ? (
            <DeleteBox
              id={showWarn}
              fnc={deleteNote}
              text="Note"
              set={setShowWarn}
            />
          ) : (
            <div className="notes">
              {notes.map((note) => {
                const randColor = colorOptions[Math.floor(Math.random() * 4)];

                return (
                  <div className="note">
                    <div>
                      <FaRegFileAlt
                        className="note-img"
                        style={{ background: randColor }}
                      />
                      <div className="note-txt">
                        <h1>{note.title}</h1>
                        <span>
                          {getSubject(note.subject)} |{" "}
                          {new Date(note.createdAt).toLocaleDateString(
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
                    <div className="btns">
                      <button
                        onClick={() => {
                          navigate(`/previewNote/${note._id}`);
                        }}
                      >
                        View Note
                      </button>
                      <div>
                        <button
                          onClick={() => {
                            navigate(`/updateNote/${note._id}`);
                          }}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          onClick={() => {
                            setShowWarn(note._id);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notes;
