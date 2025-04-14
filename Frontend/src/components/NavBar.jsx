import React from "react";
import "./style/navbar.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { logOutUser } = useUserContext();

  const handleLogOut = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <div className="navbar-div">
      <h1>Store Pad</h1>
      <button onClick={handleLogOut} className="logout-btn">
        <AiOutlineLogout className="mr-2" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default NavBar;
