import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import "../utils/style/utils.css";
import axios from "../axios";
import { enqueueSnackbar } from "notistack";

const NoteDetails = ({ singleNote, fetchAllNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    deleteAfter: "", // time in milliseconds
  });

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
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  };

  const handleDeleteNote = async () => {
    try {
      const { data } = await axios.delete(
        `/api/notes/delete-note/${singleNote?._id}`
      );
      fetchAllNotes();
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  };

  return (
    <div className="note-detail-container space-y-10">
      <div className="note-writting-div space-y-2">
        {isEditing ? (
          <>
            <div className="isEditing-title-div flex items-start justify-between">
              <input
                type="text"
                value={noteData.title}
                onChange={(e) =>
                  setNoteData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Title..."
              />
              <div className="btns space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button className="update-btn" onClick={handleUpdateNote}>
                  Update
                </button>
              </div>
            </div>

            {/* Auto-delete dropdown */}
            <div className="flex flex-col space-y-2">
              <label className="text-[18px]">Auto-delete after</label>
              <select
                value={noteData.deleteAfter}
                onChange={(e) =>
                  setNoteData((prev) => ({
                    ...prev,
                    deleteAfter: e.target.value,
                  }))
                }
                className="py-1 px-2 rounded-md bg-[#141517] w-fit"
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
              className="isEditing-para-area"
              rows="16"
            ></textarea>
          </>
        ) : (
          <>
            <div className="title-btns-div flex items-start justify-between">
              <h2>{singleNote?.title || "Open a note"}</h2>
              <div className="btns">
                <button className="like-btn tool-btns">
                  <FaStar className="tool-icons-style" />
                </button>
                <button
                  onClick={() =>
                    singleNote?._id ? setIsEditing(true) : setIsEditing(false)
                  }
                  className="edit-btn tool-btns"
                >
                  <FiEdit2 className="tool-icons-style" />
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="delete-btn tool-btns"
                >
                  <MdOutlineDelete className="tool-icons-style" />
                </button>
              </div>
            </div>
            <p className="text-[18px] py-3">{singleNote?.description || ""}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
