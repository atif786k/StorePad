import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NotesList from "../components/NotesList";
import NoteDetails from "../components/NoteDetails";
import axios from "../axios";
import NavBar from "../components/NavBar";
import CreateNote_Card from "../components/CreateNote_Card";
import { MdClose } from "react-icons/md";

const MainFrame = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);
  const [singleNote, setSingleNote] = useState([]);
  const [favouriteNotes, setFavouriteNotes] = useState([]);
  const [openCreateNoteCard, setOpenCreateNoteCard] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getAllNotes = async () => {
    try {
      const { data } = await axios.get("/api/notes/fetch-note");
      setAllNotes(data.notes);
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

  const getFavouriteNotes = async () => {
    try {
      const { data } = await axios.get("/api/activity/fetch-liked-notes");
      if (data.data.length === 0) {
        console.log(data.msg);
        setFavouriteNotes([]);
        return;
      }
      const likedNotes = await Promise.all(
        data.data.map(async (liked) => {
          try {
            const favResponse = await axios.get(
              `/api/notes/fetch-note/${liked.noteId}`
            );
            return favResponse.data.singleNote;
          } catch (error) {
            if (error.response?.status === 404) {
              console.warn(`Note ${liked.noteId} not found, skipping it`);
              return null;
            }
            throw error;
          }
        })
      );
      setFavouriteNotes(likedNotes.filter((like) => like !== null));
    } catch (error) {
      console.log(
        "Something went wrong while fetching the favourite notes: ",
        error.response?.data?.msg
      );
    }
  };

  const toggleFavouriteNotes = async (noteId) => {
    try {
      const isFavourite = favouriteNotes.some((note) => note._id === noteId);
      if (isFavourite) {
        await axios.delete(`/api/activity/${noteId}/unliked-note`);
        console.log("Note unliked successfully");
      } else {
        await axios.post(`/api/activity/${noteId}/liked-note`);
        console.log("Note liked successfully");
      }
      getFavouriteNotes();
    } catch (error) {
      console.error(
        error.response?.data?.msg ||
          "Something went wrong while updating like status."
      );
      console.error("Like toggle error:", error.response.data.msg);
    }
  };

  useEffect(() => {
    if (!user?.authenticatedUser) {
      navigate("/login", { replace: true });
      return;
    }
    getAllNotes();
    getFavouriteNotes();
    if (activeView === "favorites") {
      getFavouriteNotes();
    }
    const intervalId = setInterval(() => {
      getAllNotes();
    }, 60000 * 1);
    return () => clearInterval(intervalId);
  }, [user, navigate, activeView]);

  // If user is not authenticated, don't render the component
  if (!user?.authenticatedUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#c0c0c3] overflow-x-hidden">
      <NavBar />
      <div className="lg:flex h-[calc(100vh-75px)]">
        <SideBar activeView={activeView} setActiveView={setActiveView} />
        <div className="flex-1 flex min-w-0">
          <NotesList
            allNotes={allNotes}
            getSingleNote={getSingleNote}
            openCreateCard={() => setOpenCreateNoteCard(true)}
            activeView={activeView}
            favouriteNotes={favouriteNotes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="hidden md:flex flex-1 min-w-0">
            <NoteDetails
              singleNote={singleNote}
              clearNoteField={() => setSingleNote([])}
              fetchAllNotes={getAllNotes}
              favouriteNotes={favouriteNotes}
              toggleFavouriteNotes={toggleFavouriteNotes}
            />
          </div>
        </div>
      </div>
      {openCreateNoteCard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto">
          <CreateNote_Card
            fetchAllNotes={getAllNotes}
            closeCreateNoteCard={() => setOpenCreateNoteCard(false)}
          />
        </div>
      )}
      {singleNote?._id && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 md:hidden">
          <div className="w-full h-full overflow-y-auto p-4">
            <div className="bg-[#0f0f0f] rounded-lg shadow-lg h-full overflow-hidden">
              <div className="flex justify-end md:hidden pt-4 px-4">
                <button
                  onClick={() => setSingleNote([])}
                  className="text-white bg-[#1f75fe] hover:bg-[#1f75fe]/70 p-2 rounded-full"
                >
                  <MdClose className="text-lg" />
                </button>
              </div>
              <NoteDetails
                singleNote={singleNote}
                clearNoteField={() => setSingleNote([])}
                fetchAllNotes={getAllNotes}
                favouriteNotes={favouriteNotes}
                toggleFavouriteNotes={toggleFavouriteNotes}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainFrame;
