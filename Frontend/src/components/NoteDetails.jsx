import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import axios from "../axios";

const NoteDetails = ({
  singleNote,
  clearNoteField,
  fetchAllNotes,
  favouriteNotes,
  toggleFavouriteNotes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    deleteAfter: "", // time in milliseconds
  });

  const isFavourite = favouriteNotes.some(
    (note) => note._id === singleNote._id
  );

  useEffect(() => {
    setNoteData({
      title: singleNote?.title || "",
      description: singleNote?.description || "",
      deleteAfter: "", // default: no auto-delete
    });
  }, [singleNote]);

  const handleUpdateNote = async () => {
    try {
      const { data } = await axios.put(
        `/api/notes/edit-note/${singleNote?._id}`,
        noteData
      );
      fetchAllNotes();
      setIsEditing(false);
      clearNoteField();
      enqueueSnackbar("Note updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || "Failed to update note", {
        variant: "error",
      });
    }
  };

  const handleDeleteNote = async () => {
    try {
      const { data } = await axios.delete(
        `/api/notes/delete-note/${singleNote?._id}`
      );
      fetchAllNotes();
      clearNoteField();
      enqueueSnackbar("Note deleted successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || "Failed to delete note", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex-1 p-6 bg-[#0f0f0f] min-w-0">
      <div className="max-w-full mx-auto h-[calc(100vh-120px)] flex flex-col">
        {isEditing ? (
          <div className="space-y-6 flex-1 overflow-y-auto">
            <div className="flex items-start justify-between">
              <input
                type="text"
                value={noteData.title}
                onChange={(e) =>
                  setNoteData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Title..."
                className="text-2xl font-semibold bg-transparent pb-4 border-b border-[#252525] focus:border-[#1f75fe] focus:outline-none w-fit text-[#c0c0c3] placeholder:text-[#99999b]"
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-[#c0c0c3] bg-[#252525] rounded-md hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-[#191919]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateNote}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1f75fe] rounded-md hover:bg-[#1f75fe]/90 focus:outline-none focus:ring-2 focus:ring-[#1f75fe]"
                >
                  Update
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#99999b]">
                Auto-delete after
              </label>
              <select
                value={noteData.deleteAfter}
                onChange={(e) =>
                  setNoteData((prev) => ({
                    ...prev,
                    deleteAfter: e.target.value,
                  }))
                }
                className="w-full px-3 py-3 bg-[#191919] border border-[#252525] rounded-[1rem] focus:outline-none focus:ring-1 focus:ring-[#1f75fe] text-[#99999b]"
              >
                <option value="">Don't auto-delete</option>
                <option value={60000}>After 1 minute</option>
                <option value={3600000}>After 1 hour</option>
                <option value={86400000}>After 1 day</option>
                <option value={604800000}>After 7 days</option>
              </select>
            </div>

            <textarea
              value={noteData.description}
              onChange={(e) =>
                setNoteData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Your description..."
              className="whitespace-pre-wrap w-full h-[calc(100vh-300px)] p-4 bg-[#191919] border border-[#252525] rounded-[1rem] focus:outline-none focus:ring-1 focus:ring-[#1f75fe] resize-none text-[#c0c0c3] custom-scrollbar custom-scrollbar-thumb placeholder:text-[#99999b]"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white break-words pr-4">
                {singleNote?.title || "Open a note"}
              </h2>
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => toggleFavouriteNotes(singleNote._id)}
                  className="p-2 transition-colors duration-200"
                >
                  <FaStar
                    className={`text-xl ${
                      isFavourite
                        ? "text-pink-600"
                        : "text-white hover:text-[#1f75fe]"
                    }`}
                  />
                </button>
                <button
                  onClick={() =>
                    singleNote?._id ? setIsEditing(true) : setIsEditing(false)
                  }
                  className="p-2 text-white hover:text-[#1f75fe] transition-colors duration-200"
                >
                  <FiEdit2 className="text-xl" />
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="p-2 text-white hover:text-red-400 transition-colors duration-200"
                >
                  <MdOutlineDelete className="text-xl" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto prose prose-invert max-w-none custom-scrollbar custom-scrollbar-thumb">
              <p className="text-[#c0c0c3] whitespace-pre-wrap break-words">
                {singleNote?.description || ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
