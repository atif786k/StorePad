import React, { useState } from "react";
import axios from "../axios";
import "./auth.css";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CiUser, CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [errVal, setErrVal] = useState("");
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const clearAllFields = () => {
    setLoginValues({
      email: "",
      password: "",
    });
  };

  const handleLoginForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/user-login", loginValues);
      enqueueSnackbar(response.data.msg, { variant: "success" });
      // console.log(response.data.userProfile);
      navigate("/main");
      clearAllFields();
    } catch (error) {
      setErrVal(error.response.data.msg);
      console.log(error.response.data.msg);
      // enqueueSnackbar(error, { variant: "error" });
      // alert(error.response ? error.response.data.msg : "Failed to login");
    }
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form space-y-4" onSubmit={handleLoginForm}>
          <div className="login-title">
            <h2>Welcome Back</h2>
            <h4>
              Don't have an account yet?{" "}
              <Link to="/signin" className="font-bold">
                Sign up
              </Link>
            </h4>
          </div>

          <div className="input-div">
            <CiUser className="login-icon-style" />
            <input
              className="login-input-fields"
              type="text"
              name="email"
              placeholder="email"
              onChange={(event) =>
                setLoginValues((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              value={loginValues.email}
            />
          </div>

          <div className="input-div">
            <CiLock className="login-icon-style" />
            <input
              className="login-input-fields"
              type="password"
              name="password"
              placeholder="password"
              onChange={(event) =>
                setLoginValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              value={loginValues.password}
            />
          </div>

          <button type="submit" className="sumbit-login-form login-btn">
            Login
          </button>
          <span className="or">or</span>
          <ul className="login-list">
            <li>
              <FcGoogle />
            </li>
            <li>
              <FaXTwitter />
            </li>
            <li>
              <FaGithub />
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Login;
