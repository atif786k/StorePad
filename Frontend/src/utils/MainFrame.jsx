import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import NoteShow from "./NoteShow";
import NoteDetail from "./NoteDetail";
import "./style/mainFrame.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const MainFrame = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
  });

  const getUserProfile = async () => {
    try {
      const response = await axios("/auth/user");
      setUserProfile({
        username: response.data.userProfile.username,
        email: response.data.userProfile.email,
      });
      console.log(userProfile.username);
    } catch (error) {
      alert(error.response.data.msg);
      navigate("/");
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.get("/auth/logout");
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="main-frame">
      <Navigation profile={userProfile} />
      <NoteShow />
      <NoteDetail logOutFunction={handleLogOut} />
    </div>
  );
};

export default MainFrame;
