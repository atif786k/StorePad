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
          <div className="flex items-center">
            <h1 className="logo-styling">
              St
              <span>
                <svg class="c-bttn__morph" fill="none" viewBox="0 0 131 136">
                  <g transform="scale(1.5) translate(-22, -22)">
                    <path
                      class="g-path"
                      data-morph="end"
                      fill="#fff"
                      d="M48 77.457v7.224h7.224l21.307-21.306-7.224-7.225L48 77.457Zm34.118-19.67a1.919 1.919 0 0 0 0-2.716l-4.508-4.508a1.919 1.919 0 0 0-2.716 0l-3.526 3.526 7.224 7.224 3.526-3.525Z"
                    />
                    <path
                      class="g-path"
                      data-morph="start"
                      fill="#fff"
                      d="M48 77.457v7.224h7.224l21.307-21.306-7.224-7.225L48 77.457Zm34.118-19.67a1.919 1.919 0 0 0 0-2.716l-4.508-4.508a1.919 1.919 0 0 0-2.716 0l-3.526 3.526 7.224 7.224 3.526-3.525Z"
                    />
                  </g>
                </svg>
              </span>
              repad
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
