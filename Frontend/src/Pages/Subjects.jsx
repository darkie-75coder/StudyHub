import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { GoPlus } from "react-icons/go";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { LuBookText } from "react-icons/lu";
import DeleteBox from "../Components/DeleteBox";
import { toast } from "react-toastify";
import axios from "axios";

const Subjects = () => {
  const { subjects, setSubjects } = useContext(AppContext);

  const navigate = useNavigate();

  const [showWarn, setShowWarn] = useState(null);

  async function deleteSub(id) {
    try {
      const { data } = await axios.delete(
        `https://studyhub-1ln4.onrender.com/api/subject/delete/${id}`,
      );

      await setSubjects(subjects.filter((subject) => subject._id !== id));

      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="sub-box">
      <Sidebar />
      <div className="sub-content">
        <div className="top-nav">
          <h1>Subjects</h1>
          <button
            className="create-btn"
            onClick={() => {
              navigate("/createSubject");
            }}
          >
            <GoPlus className="plus-icon" /> <p>Add Subject</p>
          </button>
        </div>

        {showWarn ? (
          <DeleteBox
            text="subject"
            fnc={deleteSub}
            set={setShowWarn}
            id={showWarn}
          />
        ) : (
          <div className="subjects">
            {subjects.map((subject) => {
              return (
                <div className="subject" key={subject._id}>
                  <div className="left-sub">
                    <div className="sub-img">
                      <LuBookText
                        style={{ background: subject.color }}
                        className="sub-book"
                      />
                    </div>
                    <div className="sub-txt">
                      <h2>{subject.name}</h2>
                      <span>
                        Created on{" "}
                        {new Date(subject.createdAt).toLocaleDateString(
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
                  <button
                    onClick={() => {
                      setShowWarn(subject._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
