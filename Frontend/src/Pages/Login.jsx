import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const navigate = useNavigate();

  const { setLoggedIn } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Handler(e) {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        },
      );

      toast.success(data.message);
      await setLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="login-box">
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
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
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
    </div>
  );
};

export default Login;
