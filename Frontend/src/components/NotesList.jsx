import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi2";
import NoteList_Card from "./NoteList_Card";

const NotesList = ({
  allNotes,
  getSingleNote,
  openCreateCard,
  favouriteNotes,
  activeView,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  // Sort notes in Descending order
  const sortedNotes = [...allNotes].sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  // Filter notes based on active view
  let filteredNotes =
    activeView === "favorites"
      ? sortedNotes.filter((note) =>
          favouriteNotes.some((likedNote) => likedNote._id === note._id)
        )
      : sortedNotes;

  // Further filter based on searchQuery
  if (searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredNotes = filteredNotes.filter((note) =>
      note.title.toLowerCase().includes(lowerQuery)
    );
  }

  return (
    <div className="w-1/3 min-w-[300px] border-r border-[#252525] p-6 flex flex-col">
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99999b] w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0f0f0f] border border-[#252525] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1f75fe] focus:border-transparent text-[#c0c0c3] placeholder:text-[#99999b]"
          />
        </div>
        <button
          onClick={openCreateCard}
          className="p-2 bg-[#1f75fe] text-white rounded-lg hover:bg-[#1f75fe]/70 focus:outline-none"
        >
          <HiOutlinePlus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <h4 className="text-sm font-semibold text-[#1f75fe] uppercase tracking-wider mb-4">
          {activeView === "favorites" ? "Favorite Notes" : "All Notes"}
        </h4>
        <div className="h-full pb-10 overflow-y-auto space-y-6 no-scrollbar">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                onClick={() => {
                  getSingleNote(note._id);
                  setSelectedNoteId(note._id);
                }}
                className={`cursor-pointer border-2 rounded-lg ${
                  selectedNoteId === note._id
                    ? "border-[#1f75fe]/70"
                    : "border-transparent"
                }`}
              >
                <NoteList_Card
                  title={note.title}
                  description={note.description}
                  deleteAt={note.deleteAt}
                  createdDate={note.updatedAt}
                  activeView={activeView}
                  isFavorite={favouriteNotes.some(
                    (favNote) => favNote._id === note._id
                  )}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-[#99999b] mt-8">
              <p className="text-lg">
                {activeView === "favorites"
                  ? "No favorite notes yet"
                  : "No saved notes"}
              </p>
              <p className="text-sm mt-2">
                {activeView === "favorites"
                  ? "Add notes to favorites to see them here"
                  : "Create your first note to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesList;
