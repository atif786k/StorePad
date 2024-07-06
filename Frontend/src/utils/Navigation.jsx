import React from "react";
import "./style/utils.css";
import { CiStickyNote } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";

const Navigation = ({ profile }) => {
  return (
    <>
      <div className="nav-container space-y-4">
        <div className="logo-container">
          <span className="logoFont">
            <img src="" alt="" />
            Store Pad
          </span>
        </div>
        <div className="profile-container">
          <section>
            <img src="/images/man.png" width="50px" alt="" />
          </section>
          <section>
            <span className="username-span">
              {profile.username ? profile.username : "User"}
            </span>
            <span className="email-span">{profile.email ? profile.email : "user@gmail.com"}</span>
          </section>
        </div>
        <div className="quick-links">
          <h3 className="links-heading">Quick Links</h3>
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

export default Navigation;
