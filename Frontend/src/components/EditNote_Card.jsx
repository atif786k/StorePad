import React, { useState } from "react";
import "./style/style.css";
import axios from "../axios";

const EditNote_Card = ({ popupFunctionEdit, noteData, getNotesFunction }) => {

  const [notevalues, setNoteValues] = useState({
    title: noteData.title,
    description: noteData.description,
  });

  const handleEditNote = async () => {
    try {
      const response = await axios.put(`/note/edit-note/${noteData._id}`, notevalues);
      console.log(response.data.msg);
      popupFunctionEdit();
      getNotesFunction();
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  return (
    <main className="main-container">
      <div className="form-container">
        <form className="form" onSubmit={handleEditNote}>
          <div className="form-group">
            <label>Title</label>
            <input
              required=""
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
            />
          </div>
          <div className="form-group">
            {/* <label>Write your content here</label> */}
            <textarea
              required=""
              cols="20"
              rows="12"
              id="textarea"
              name="textarea"
              value={notevalues.description}
              onChange={(event) =>
                setNoteValues((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            >
              {" "}
            </textarea>
          </div>
          <button type="submit" className="form-submit-btn">
            Edited & Save
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditNote_Card;
