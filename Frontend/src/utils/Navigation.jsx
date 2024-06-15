import React from "react";
import "./style/utils.css";
import { CiStickyNote, CiStar } from "react-icons/ci";

const Navigation = ({ profile }) => {
  return (
    <>
      <div className="nav-container space-y-4">
        <div className="logo-container">
          <span>
            <img src="" alt="" />
            Store Pad
          </span>
        </div>
        <div className="profile-container">
          <span>{profile.username ? profile.username : "User"}</span>
          <span>{profile.email ? profile.email : "user@gmail.com"}</span>
        </div>
        <div className="quick-links">
          <h3 className="links-heading">Quick Links</h3>
          <ul>
            <li>
              <CiStickyNote className="nav-icons-style" />
              All Notes
            </li>
            <li>
              <CiStar className="nav-icons-style" />
              Favorites
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
