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
  const [singleNote, setSingleNote] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
      enqueueSnackbar(error.response.data.msg, { variant: "warning" });
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
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error.response.data.errorMsg);
    }
  };

  const getSingleNote = async (_id) => {
    try {
      const response = await axios.get(`/note/fetch-note/${_id}`);
      if (response.data && response.data.singleNote) {
        setSingleNote(response.data.singleNote);
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleDeleteNote = async () => {
    try {
      const response = await axios.delete(
        `/note/delete-note/${singleNote._id}`
      );
      console.log(response.data.msg);
      enqueueSnackbar(response.data.msg, { variant: "success" });
      getAllNotes();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handlePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    getAllNotes();
    getUserProfile();
    return () => {};
  }, []);

  return (
    <div className="main-frame">
      <Navigation profile={userProfile} />
      <NoteShow
        allNotes={allNotes}
        getSingleNote={getSingleNote}
        popupFunction={handlePopup}
      />
      <NoteDetail
        singleNote={singleNote}
        isPopupVisible={isPopupVisible}
        logOutFunction={handleLogOut}
        deleteFunction={handleDeleteNote}
        getNotesFunction={getAllNotes}
        popupFunction={handlePopup}
      />
    </div>
  );
};

export default MainFrame;
