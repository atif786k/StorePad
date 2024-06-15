import React, { useState } from "react";
import "./auth.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [fieldsValues, setFieldValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const clearAllFields = () => {
    setFieldValues({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSignForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/register", fieldsValues);
      alert(response.data.msg);
      navigate("/login");
      clearAllFields();
    } catch (error) {
      alert("Failed to register");
    }
  };

  return (
    <>
      <form className="sign-container" onSubmit={handleSignForm}>
        <div className="inputs-fields">
          <input
            id="username"
            required
            onChange={(event) =>
              setFieldValues((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }
            value={fieldsValues.username} // Ensure this is set
            type="text"
            name="username"
            placeholder="User Name"
          />
          <input
            id="email"
            required
            onChange={(event) =>
              setFieldValues((prev) => ({ ...prev, email: event.target.value }))
            }
            value={fieldsValues.email} // Ensure this is set
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            id="password"
            required
            onChange={(event) =>
              setFieldValues((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            value={fieldsValues.password} // Ensure this is set
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="submit-sign-form">
          Sign in
        </button>
      </form>
    </>
  );
};

export default SignIn;
