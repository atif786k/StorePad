import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { MdModeEdit, MdDeleteOutline, MdContentCopy } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../axios";
import "../App.css";

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

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ font: [] }],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "script",
    "size",
    "font",
    "direction",
  ];

  useEffect(() => {
    const { title, description, deleteAt, updatedAt, createdAt } = singleNote;
    let deleteAfter = "";

    if (deleteAt) {
      const baseTime = new Date(updatedAt || createdAt).getTime();
      const deleteTime = new Date(deleteAt).getTime();
      const diff = deleteTime - baseTime;

      // Match one of the predefined values (as strings)
      const validOptions = ["60000", "3600000", "86400000", "604800000"];
      if (validOptions.includes(diff.toString())) {
        deleteAfter = diff.toString();
      }
    }

    setNoteData({
      title,
      description,
      deleteAfter,
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

  const handleCopyToClipboard = async () => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = singleNote?.description || "";
      const plainTextDescription =
        tempElement.textContent || tempElement.innerHTML || "";
      const textToCopy = `Title: ${
        singleNote?.title || ""
      }\n\n${plainTextDescription}`;
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([singleNote?.description || ""], {
            type: "text/html",
          }),
          "text/plain": new Blob([textToCopy], { type: "text/plain" }),
        }),
      ]);
      console.log(textToCopy);
      enqueueSnackbar("Note copied to clipboard", { variant: "success" });
    } catch (error) {
      console.error("Copy failed:", error);
      enqueueSnackbar("Failed to copy note", { variant: "error" });
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      // year: "numeric",
    });
  };

  return (
    <div className="flex-1 px-2 md:px-6 bg-[#0f0f0f] min-w-0">
      <div className="max-w-full mx-auto h-[calc(100vh-80px)] flex flex-col">
        {isEditing ? (
          <div className="space-y-6 py-6 mb-2 flex-1 overflow-y-auto no-scrollbar">
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
              <div className="space-y-2 md:space-y-0 md:flex md:items-center md:space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-[#c0c0c3] bg-[#252525] rounded-lg hover:bg-[#252525]/70 focus:outline-none focus:ring-2 focus:ring-[#191919]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateNote}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1f75fe] rounded-lg hover:bg-[#1f75fe]/70 focus:outline-none"
                >
                  Update
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <select
                value={noteData.deleteAfter}
                onChange={(e) =>
                  setNoteData((prev) => ({
                    ...prev,
                    deleteAfter: e.target.value,
                  }))
                }
                className="w-full px-3 py-3 bg-[#191919] border border-[#252525] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1f75fe] text-[#99999b]"
              >
                <option value="">Don't auto-delete</option>
                <option value="60000">After 1 minute</option>
                <option value="3600000">After 1 hour</option>
                <option value="86400000">After 1 day</option>
                <option value="604800000">After 7 days</option>
              </select>
            </div>

            {/* <textarea
              value={noteData.description}
              onChange={(e) =>
                setNoteData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Your description..."
              className="whitespace-pre-wrap w-full h-[calc(100vh-300px)] p-4 bg-[#191919] border border-[#252525] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1f75fe] resize-none text-[#c0c0c3] custom-scrollbar custom-scrollbar-thumb placeholder:text-[#99999b]"
            /> */}
            <ReactQuill
              theme="snow"
              value={noteData.description}
              onChange={(value) =>
                setNoteData((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
              modules={quillModules}
              formats={quillFormats}
              className="custom-quill-editor"
              style={{
                border: "none",
                outline: "none",
                height: "calc(100vh - 300px)",
                color: "#c0c0c3",
              }}
            />
          </div>
        ) : (
          <div className="py-6 flex-1 flex flex-col overflow-y-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white break-words flex items-start md:items-center space-x-6">
                <span className="py-2 px-1 h-12 rounded-md bg-[#1f75fe]"></span>
                <span>{singleNote?.title || "Open a note"}</span>
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
                  <MdModeEdit className="text-xl" />
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="p-2 text-white hover:text-[#1f75fe] transition-colors duration-200"
                >
                  <MdContentCopy className="text-xl" />
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="p-2 text-white hover:text-red-500 transition-colors duration-200"
                >
                  <MdDeleteOutline className="text-xl" />
                </button>
              </div>
            </div>

            <div className="px-4 md:px-8 flex-1 overflow-y-auto max-w-none custom-scrollbar custom-scrollbar-thumb prose prose-invert">
              <div className="mb-6 flex items-center space-x-8">
                <span className="text-sm text-[#99999b]">
                  Updated - {formatDate(singleNote?.updatedAt)}
                </span>
                <span className="text-sm text-[#99999b]">
                  Created - {formatDate(singleNote?.createdAt)}
                </span>
              </div>
              <p
                className=" whitespace-pre-wrap custom-quill-editor"
                dangerouslySetInnerHTML={{
                  __html: singleNote?.description || "",
                }}
              ></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
