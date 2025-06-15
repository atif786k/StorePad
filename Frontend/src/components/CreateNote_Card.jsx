import React, { useState } from "react";
import axios from "../axios";
import { enqueueSnackbar } from "notistack";

const CreateNote_Card = ({ fetchAllNotes, closeCreateNoteCard }) => {
  const [notevalues, setNoteValues] = useState({
    title: "",
    description: "",
    deleteAfter: "",
  });

  const clearAllFields = () => {
    setNoteValues({
      title: "",
      description: "",
      deleteAfter: "",
    });
  };

  const handleNoteCreation = async (event) => {
    event.preventDefault();
    console.log(notevalues);
    try {
      const { data } = await axios.post("/api/notes/create-note", notevalues);
      enqueueSnackbar(data.msg, { variant: "success" });
      clearAllFields();
      closeCreateNoteCard();
      fetchAllNotes();
    } catch (error) {
      console.log(error.response?.data?.msg);
    }
  };

  return (
    <>
      <form
        onSubmit={handleNoteCreation}
        className="w-full md:w-[800px] mx-4 p-8 bg-[#191919] transition-colors duration-200 border border-[#252525] rounded-lg space-y-4 "
      >
        <h3 className="text-2xl font-semibold mb-4">Create a Note</h3>

        <div>
          <label className="block font-semibold text-md text-[#777585] mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="title"
            id="title"
            type="text"
            value={notevalues.title}
            placeholder="Enter your title here..."
            onChange={(event) =>
              setNoteValues((prev) => ({
                ...prev,
                title: event.target.value,
              }))
            }
            className="w-full p-2 bg-transparent transition-colors duration-200 border border-[#252525] rounded-lg focus:ring-1 focus:ring-[#1f75fe] outline-none placeholder:text-[#777585]"
          />
        </div>

        <div>
          <label className="block font-semibold text-md text-[#777585] mb-2">
            Auto Delete (Optional)
          </label>
          <select
            value={notevalues.deleteAfter}
            onChange={(event) =>
              setNoteValues((prev) => ({
                ...prev,
                deleteAfter: event.target.value,
              }))
            }
            className="w-full p-2 bg-transparent transition-colors duration-200 border border-[#252525] rounded-lg focus:ring-1 focus:ring-[#1f75fe] outline-none placeholder:text-[#777585]"
          >
            <option value="">Auto-Delete Note Timer</option>
            <option value={60000}>After 1 minute</option>
            <option value={3600000}>After 1 hour</option>
            <option value={86400000}>After 1 day</option>
            <option value={604800000}>After 7 days</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-md text-[#777585] mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            cols="20"
            rows="12"
            id="textarea"
            name="textarea"
            value={notevalues.description}
            placeholder="Type your content here..."
            onChange={(event) =>
              setNoteValues((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            className="w-full p-2 bg-transparent transition-colors duration-200 border border-[#252525] rounded-lg focus:ring-1 focus:ring-[#1f75fe] outline-none placeholder:text-[#777585]"
          >
            {" "}
          </textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#1f75fe] text-white py-2 px-6 rounded-lg hover:bg-[#1f75fe]/70"
          >
            Save
          </button>
          <button
            onClick={closeCreateNoteCard}
            className="py-2 px-6 rounded-lg text-[#1f75fe] hover:bg-[#252525]/70"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNote_Card;
