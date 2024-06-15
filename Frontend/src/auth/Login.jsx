import React, { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
      console.log(response.data);
      alert(response.data.msg);
      console.log("Login sucessfully no need to worry");
      navigate("/main");
      clearAllFields();
    } catch (error) {
      alert(error.response ? error.response.data.message : "Failed to login");
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
