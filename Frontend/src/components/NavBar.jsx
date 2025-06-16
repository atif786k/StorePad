import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { logOutUser } = useUserContext();

  const handleLogOut = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-[#191919] border-b border-[#252525]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[73px]">
          <div>
            <h1 className="logo-styling space-x-2">
              <img src="/images/sticky-note.png" alt="" width="30px" />
              <span>StorePad</span>
            </h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1f75fe] hover:bg-[#1f75fe]/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f75fe] transition-colors duration-200"
            >
              <AiOutlineLogout className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
