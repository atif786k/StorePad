import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import NoteShow from "./NoteShow";
import NoteDetail from "./NoteDetail";
import "./style/mainFrame.css";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const MainFrame = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [userProfile, setUserProfile] = useState({
    user_id: "",
    username: "",
    email: "",
  });

  const getUserProfile = async () => {
    try {
      const response = await axios("/auth/user");
      setUserProfile({
        user_id: response.data.userProfile.user_id,
        username: response.data.userProfile.username,
        email: response.data.userProfile.email,
      });
      console.log(userProfile.username);
    } catch (error) {
      enqueueSnackbar(error.response.data.msg, {variant: 'warning'})
      navigate("/");
    }
  };

  const handleLogOut = async () => {
    try {
      const response = await axios.get("/auth/logout");
      enqueueSnackbar(response.data.msg, { variant: "success" });
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
