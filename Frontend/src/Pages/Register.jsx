import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import Loader from "../Components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consPass, setConsPass] = useState("");

  const [type, setType] = useState("password");
  const [typeg, setTypeg] = useState("password");

  const [loading, setLoading] = useState(false);

  const { setLoggedIn } = useContext(AppContext);

  async function Handler(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    if (password !== consPass) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://studyhub-1ln4.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        },
      );

      toast.success(data.message);
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-box">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={Handler}>
          <img src={logo} className="l-logo" />
          <p>Create your account</p>
          <p>Start your journey with us</p>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
          <div className="pass-inp">
            <input
              type={type}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
            {type === "password" ? (
              <button
                className="eye-btn"
                type="button"
                onClick={() => {
                  setType("text");
                }}
              >
                <FaEye />{" "}
              </button>
            ) : (
              <button
                className="eye-btn"
                type="button"
                onClick={() => {
                  setType("password");
                }}
              >
                <FaEyeSlash />
              </button>
            )}
          </div>
          <div className="pass-inp">
            <input
              type={typeg}
              placeholder="Password"
              onChange={(e) => {
                setConsPass(e.target.value);
              }}
              value={consPass}
              required
            />
            {typeg === "password" ? (
              <button
                className="eye-btn"
                type="button"
                onClick={() => {
                  setTypeg("text");
                }}
              >
                <FaEye />{" "}
              </button>
            ) : (
              <button
                className="eye-btn"
                type="button"
                onClick={() => {
                  setTypeg("password");
                }}
              >
                <FaEyeSlash />
              </button>
            )}
          </div>
          <button>Register</button>
          <p>
            Already have an account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Login here
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
