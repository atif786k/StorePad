import React, { useState } from "react";
import "./styles/auth.css";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CiUser, CiLock, CiMail } from "react-icons/ci";
import axios from "../axios";

const SignIn = () => {
  const navigate = useNavigate();
  const enqueueSnackbar = useSnackbar();
  const [errorValue, setErrorValue] = useState("");

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

  const handleSignForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/auth/user-register",
        fieldsValues
      );
      clearAllFields();
      navigate("/login");
      enqueueSnackbar(data.msg, { variant: "success" });
    } catch (error) {
      setErrorValue(error.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="signin-container">
        <form className="signin-form space-y-4" onSubmit={handleSignForm}>
          <div className="signin-title">
            <h2>Create an account</h2>
          </div>

          <div className="fields-container space-y-2">
            <div className="input-div">
              <CiUser className="signin-icon-style" />
              <input
                className="signin-input-fields"
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
            </div>

            <div className="input-div">
              <CiMail className="signin-icon-style" />
              <input
                className="signin-input-fields"
                id="email"
                required
                onChange={(event) =>
                  setFieldValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                value={fieldsValues.email} // Ensure this is set
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div className="input-div">
              <CiLock className="signin-icon-style" />
              <input
                className="signin-input-fields"
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
          </div>

          {errorValue && (
            <h4 className="ml-2 text-[14px] text-red-500 font-semibold">
              {errorValue}
            </h4>
          )}

          <button
            type="submit"
            className="submit-sign-form signin-btn font-semibold"
          >
            Sign in
          </button>
          <h4 className="text-[#99999b] text-[16px]">
            Already have an account?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </h4>
        </form>
      </div>
    </>
  );
};

export default SignIn;
