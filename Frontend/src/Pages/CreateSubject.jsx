import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuBookPlus } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Loader from "../Components/Loader";

const CreateSubject = () => {
  const { getSubjects } = useContext(AppContext);

  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function Handler(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://studyhub-1ln4.onrender.com/api/subject/create",
        {
          name,
          color,
        },
      );

      await getSubjects();
      navigate("/subjects");
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-box">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={Handler}>
          <div className="head">
            <LuBookPlus className="form-icon" />
            <div className="form-txt">
              <h1>Add New Subject</h1>
              <p>Create a new subject to organize your tasks and notes</p>
            </div>
          </div>
          <div className="inp-box">
            <h2>Subject Name</h2>
            <input
              type="text"
              placeholder="Enter subject name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
          <div className="inp-box">
            <h2>Subject Color</h2>
            <div className="color-btns">
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#5243EA");
                }}
              >
                {color === "#5243EA" && <FaCheck className="check-icon" />}
              </div>
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#1F72F5");
                }}
              >
                {color === "#1F72F5" && <FaCheck className="check-icon" />}
              </div>
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#45B96F");
                }}
              >
                {color === "#45B96F" && <FaCheck className="check-icon" />}
              </div>
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#F9B147");
                }}
              >
                {color === "#F9B147" && <FaCheck className="check-icon" />}
              </div>
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#FA5B60");
                }}
              >
                {color === "#FA5B60" && <FaCheck className="check-icon" />}
              </div>
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#3CB6C1");
                }}
              >
                {color === "#3CB6C1" && <FaCheck className="check-icon" />}
              </div>
              <div
                className="color-btn"
                onClick={() => {
                  setColor("#BDC3CC");
                }}
              >
                {color === "#BDC3CC" && <FaCheck className="check-icon" />}
              </div>
            </div>
          </div>
          <div className="submit-btns">
            <button
              type="button"
              onClick={() => {
                navigate("/subjects");
              }}
            >
              Cancel
            </button>
            <button type="submit">Add Subject</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateSubject;
