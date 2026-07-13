import workingImg from "../assets/working_img.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BiColor, BiTask } from "react-icons/bi";
import graduateHat from "../assets/graduate-hat.png";
import { BiSolidNotepad } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { FaBook } from "react-icons/fa";
import axios from "axios";
import Loader from "../Components/Loader";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { loggedIn, setLoggedIn } = useContext(AppContext);

  async function auth() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "https://studyhub-1ln4.onrender.com/api/auth/auth-user",
      );

      setLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="Home">
      <div className="home-nav">
        <img src={logo} className="logo" />
        <div className="log-reg-btns">
          <button
            onClick={() => {
              auth();
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
      <div className="body-content">
        <div className="left-side">
          <div className="title">
            <div className="title">Organize. Learn.</div>
            <h1 className="title">Achieve.</h1>
          </div>
          <p>
            Your all-in-one platform to manage subjects, notes, tasks and more.
          </p>
          <div className="log-reg-btns">
            <button
              onClick={() => {
                auth();
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div className="right-side">
          <img src={workingImg} className="r-img" />
        </div>
      </div>
      <div className="boxes">
        <div className="box">
          <FaBook className="g-h" />
          <div>
            <p>Manage Subjects</p>
            <p>Keep all your subjects organized in one place.</p>
          </div>
        </div>
        <div className="box">
          <BiTask className="t-i" />
          <div>
            <p>Track Tasks</p>
            <p>Create manage and complete tasks easily.</p>
          </div>
        </div>
        <div className="box">
          <BiSolidNotepad className="n-i" />
          <div>
            <p>Take Notes</p>
            <p>Write, organize and access your notes anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
