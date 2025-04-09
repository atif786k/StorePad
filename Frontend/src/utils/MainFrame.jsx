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
  const [isPopupVisibleAdd, setIsPopupVisibleAdd] = useState(false);
  const [isPopupVisibleEdit, setIsPopupVisibleEdit] = useState(false);
  const [favorite, setFavorite] = useState(true);

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
      const response = await axios.get("/api/notes/fetch-note");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error.response.data.errorMsg);
    }
  };

  const getSingleNote = async (_id) => {
    try {
      const response = await axios.get(`/api/notes/fetch-note/${_id}`);
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
        `/api/notes/delete-note/${singleNote._id}`
      );
      console.log(response.data.msg);
      enqueueSnackbar(response.data.msg, { variant: "success" });
      getAllNotes();
    } catch (error) {
      console.log(error.response.data.msg);
    } 
  };

  const handlePopupAdd = () => {
    setIsPopupVisibleAdd(!isPopupVisibleAdd);
  };

  const handlePopupEdit = () => {
    setIsPopupVisibleEdit(!isPopupVisibleEdit);
  };

  const handleAddToFav = async () => {
    setFavorite(!favorite);
    console.log(favorite);
    try {
      const response = await axios.patch(`/api/notes/update-note/${singleNote._id}`, {favoriteValue: favorite});
      console.log(response.data.updateNote);
      enqueueSnackbar(response.data.msg, { variant: "success" });
      getAllNotes();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserProfile();
    return () => {};
  }, []);

  return (
    <div className="main-frame newFont">
      <Navigation profile={userProfile} />
      <NoteShow
        allNotes={allNotes}
        getSingleNote={getSingleNote}
        popupFunctionAdd={handlePopupAdd}
      />
      <NoteDetail
        singleNote={singleNote}
        isPopupVisibleAdd={isPopupVisibleAdd}
        isPopupVisibleEdit={isPopupVisibleEdit}
        favorite={favorite}
        logOutFunction={handleLogOut}
        deleteFunction={handleDeleteNote}
        getNotesFunction={getAllNotes}
        popupFunctionAdd={handlePopupAdd}
        popupFunctionEdit={handlePopupEdit}
        addToFavFunction={handleAddToFav}
      />
    </div>
  );
};

export default MainFrame;
