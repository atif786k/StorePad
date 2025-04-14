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
        className="max-w-3xl mx-4 p-8 bg-[#141517] rounded-lg space-y-4 md:w-[560px]"
      >
        <h3 className="text-2xl font-semibold mb-4">Create a Note</h3>

        <div>
          <label className="block font-semibold text-[18px] text-[#777585]">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="title"
            id="title"
            type="text"
            value={notevalues.title}
            onChange={(event) =>
              setNoteValues((prev) => ({
                ...prev,
                title: event.target.value,
              }))
            }
            className="w-full p-2 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1f75fe]"
          />
        </div>

        <div>
          <label className="block font-semibold text-[18px] text-[#777585]">
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
            className="w-full p-2 bg-[#141517] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1f75fe]"
          >
            <option value="">Auto-Delete Note Timer</option>
            <option value={60000}>After 1 minute</option>
            <option value={3600000}>After 1 hour</option>
            <option value={86400000}>After 1 day</option>
            <option value={604800000}>After 7 days</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-[18px] text-[#777585]">
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
            className="w-full p-2 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1f75fe]"
          >
            {" "}
          </textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-[#1f75fe] text-white py-2 px-6 rounded hover:bg-[#1f75fe]"
          >
            Save
          </button>
          <button onClick={closeCreateNoteCard} className="text-[#1f75fe]">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateNote_Card;
