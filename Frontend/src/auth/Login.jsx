import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const clearAllFields = () => {
    setLoginValues({
      username: "",
      password: "",
    });
  };

  const handleLoginForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", loginValues);
      enqueueSnackbar(response.data.msg, { variant: "success" });
      navigate("/main");
      clearAllFields();
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      // alert(error.response ? error.response.data.msg : "Failed to login");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLoginForm}>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={(event) =>
            setLoginValues((prev) => ({
              ...prev,
              username: event.target.value,
            }))
          }
          value={loginValues.username}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(event) =>
            setLoginValues((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
          value={loginValues.password}
        />
        <button type="submit" className="sumbit-login-form">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
