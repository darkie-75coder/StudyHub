import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Loader from "../Components/Loader";

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedIn } = useContext(AppContext);

  const [type, setType] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function Handler(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://studyhub-1ln4.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      setLoggedIn(true);
      toast.success(data.message);
      navigate("/dashboard");
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
          <p>Welcome Back!</p>
          <p>Login to your account</p>
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

          <a href="#">Forgot password?</a>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <a
              onClick={() => {
                navigate("/register");
              }}
            >
              Register here
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
