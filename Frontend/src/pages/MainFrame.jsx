import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "../utils/style/mainFrame.css";
import SideBar from "../components/SideBar";
import NotesList from "../components/NotesList";
import NoteDetails from "../components/NoteDetails";
import axios from "../axios";
import NavBar from "../components/NavBar";
import CreateNote_Card from "../components/CreateNote_Card";

const MainFrame = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);
  const [singleNote, setSingleNote] = useState([]);
  const [openCreateNoteCard, setOpenCreateNoteCard] = useState(false);

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get("/api/notes/fetch-note");
      setAllNotes(data.notes);
      enqueueSnackbar(data.msg, { variant: "success" });
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  const getSingleNote = async (noteId) => {
    try {
      const { data } = await axios.get(`/api/notes/fetch-note/${noteId}`);
      setSingleNote(data.singleNote);
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (!user?.authenticatedUser) {
      enqueueSnackbar("Please log in to access this page", {
        variant: "warning",
      });
      navigate("/login");
    } else {
      getAllNotes();
    }
  }, []);

  return (
    <div className="main-frame">
      <NavBar />
      <div className="inner-frame">
        <SideBar />
        <NotesList
          allNotes={allNotes}
          getSingleNote={getSingleNote}
          openCreateCard={() => setOpenCreateNoteCard(true)}
        />
        <NoteDetails singleNote={singleNote} fetchAllNotes={getAllNotes}/>
      </div>
      {openCreateNoteCard && (
        <div
          className="pop-up py-3 fixed inset-0 bg-black bg-opacity-70 flex items-center
         justify-center z-50 overflow-y-scroll"
        >
          <CreateNote_Card
          fetchAllNotes={getAllNotes}
            closeCreateNoteCard={() => setOpenCreateNoteCard(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MainFrame;
