import React from "react";
import { CiStickyNote } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { useUserContext } from "../context/UserContext";

const SideBar = ({ activeView, setActiveView }) => {
  const { user } = useUserContext();
  const username = user?.authenticatedUser?.username || "User";
  const email = user?.authenticatedUser?.email || "user@example.com";

  const getFirstLetter = (username) => {
    if (!username || typeof username !== "string" || username.length === 0) {
      return "";
    }
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full lg:w-64 bg-[#191919] border-r border-[#252525] p-6">
      <div className="hidden lg:flex items-center space-x-4 mb-8">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative ${
            username ? "bg-[#1f75fe]" : "bg-black"
          }`}
        >
          {username ? (
            <span className="text-white text-md font-semibold">
              {getFirstLetter(username)}
            </span>
          ) : (
            <CiUser className="w-10 h-10 absolute -bottom-2" />
          )}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">{username}</h4>
          <p className="text-sm text-[#c0c0c3]">{email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-[#1f75fe] uppercase tracking-wider">
          Quick Links
        </h2>
        <nav className="flex items-center space-x-4 lg:flex-col lg:space-x-0">
          <button
            onClick={() => setActiveView("all")}
            className={`mb-1 w-full flex items-center space-x-3 py-1 rounded-lg text-[#c0c0c3] hover:bg-[#0f0f0f] hover:text-white transition-all ease-in duration-100 ${
              activeView === "all" ? "bg-black text-white px-2" : ""
            }`}
          >
            <CiStickyNote className="w-5 h-5" />
            <span>All Notes</span>
          </button>
          <button
            onClick={() => setActiveView("favorites")}
            className={`mb-1 w-full flex items-center space-x-3 py-1 rounded-lg text-[#c0c0c3] hover:bg-[#0f0f0f] hover:text-white transition-all ease-in duration-100 ${
              activeView === "favorites" ? "bg-black text-white px-2" : ""
            }`}
          >
            <FaRegStar className="w-5 h-5" />
            <span>Favorites</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
