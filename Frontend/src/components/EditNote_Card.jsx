import React, { useState } from "react";
import "./style/style.css";

const EditNote_Card = ({ popupFunctionEdit }) => {
    const [notevalues, setNoteValues] = useState({
        title: "",
        description: "",
      });
  return (
    <main className="main-container">
      <div className="form-container">
        <form className="form">
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
            Edited & Save
          </button>
          <button onClick={() => popupFunctionEdit()} className="form-submit-btn">
            close
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditNote_Card;
