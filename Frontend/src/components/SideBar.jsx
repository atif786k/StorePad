import React from "react";
import { CiStickyNote } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import "../utils/style/utils.css";
import { useUserContext } from "../context/UserContext";

const SideBar = () => {
  const { user } = useUserContext();
  const username = user?.authenticatedUser?.username || "User";
  const email = user?.authenticatedUser?.email || "user@example.com";
  return (
    <>
      <div className="sidebar-div space-y-10">
        <div className="profile-details">
          <figure>
            <img src="/images/man.png" width="50px" alt="" />
          </figure>
          <div className="details">
            <h4>{username}</h4>
            <h4>{email}</h4>
          </div>
        </div>
        <div className="quick-links space-y-2">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <CiStickyNote className="nav-icons-style" />
              All Notes
            </li>
            <li>
              <FaRegStar className="nav-icons-style" />
              Favorites
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
