import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consPass, setConsPass] = useState("");

  async function Handler(e) {
    e.preventDefault();

    const { setLoggedIn } = useContext(AppContext);

    axios.defaults.withCredentials = true;

    if (password !== consPass) {
      return toast.error("The password do not matched.");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
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
    }
  }

  return (
    <div className="login-box">
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
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConsPass(e.target.value);
          }}
          value={consPass}
          required
        />
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
    </div>
  );
};

export default Register;
