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
  const [allNotes, setAllNotes] = useState([]);

  const [userProfile, setUserProfile] = useState({
    user_id: "",
    username: "",
    email: "",
  });

  const getUserProfile = async () => {
    try {
      const response = await axios.get("/auth/user");
      setUserProfile({
        user_id: response.data.userProfile.user_id,
        username: response.data.userProfile.username,
        email: response.data.userProfile.email,
      });
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


  const getAllNotes = async () => {
    try {
      const response = await axios.get("/note/fetch-note");
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error.response.data.errorMsg);
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserProfile();
    return () => {}
  }, []);

  return (
    <div className="main-frame">
      <Navigation profile={userProfile} />
      <NoteShow allNotes={allNotes}/>
      <NoteDetail logOutFunction={handleLogOut} getNotesFunction={getAllNotes}/>
    </div>
  );
};

export default MainFrame;
