import React, { useState } from "react";
import "./styles/auth.css";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CiUser, CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { useUserContext } from "../context/UserContext";
import axios from "../axios";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loginUser } = useUserContext();
  const [errorValue, setErrorValue] = useState("");
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

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/user-login", loginValues);
      loginUser({ authenticatedUser: data.user });
      clearAllFields();
      navigate("/");
      enqueueSnackbar(data.msg, { variant: "success" });
    } catch (error) {
      setErrorValue(error.response?.data?.msg);
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
              <Link to="/signin" className="font-bold hover:text-[#1f75fe]">
                Sign up
              </Link>
            </h4>
          </div>

          <div className="fields-container space-y-2">
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
                required
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
                required
              />
            </div>
          </div>

          {errorValue && (
            <h4 className="ml-2 text-[14px] text-red-500 font-semibold">
              {errorValue}
            </h4>
          )}

          <button
            type="submit"
            className="sumbit-login-form login-btn font-semibold"
          >
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
