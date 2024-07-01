import React, { useState } from "react";
import "./style/style.css";
import axios from "../axios";
import { enqueueSnackbar } from "notistack";

const CreateNote_Card = ({ getAllNotesFunction, popupFunction }) => {
  const [notevalues, setNoteValues] = useState({
    title: "",
    description: "",
  });

  const clearAllFields = () => {
    setNoteValues({
      title: "",
      description: "",
    });
  };

  const handleNoteCreation = async (event) => {
    event.preventDefault();
    console.log(notevalues);
    try {
      const response = await axios.post("/note/create-note", notevalues);
      enqueueSnackbar(response.data.msg, { variant: "success" });
      getAllNotesFunction();
      console.log(response.data.errorMsg);
      clearAllFields();
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <main className="main-container">
        <div className="form-container">
          <form className="form" onSubmit={handleNoteCreation}>
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
              <label>Write your content here</label>
              <textarea
                required=""
                cols="20"
                rows="200"
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
              Create
            </button>
            <button onClick={()=>popupFunction()} className="close">close</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateNote_Card;
