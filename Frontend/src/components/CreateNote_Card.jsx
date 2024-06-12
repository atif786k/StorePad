import React from "react";
import "./style/style.css";

const CreateNote_Card = () => {
  return (
    <>
      <main className="main-container">
        <div class="form-container">
          <form class="form">
            <div class="form-group">
              <label for="title">Title</label>
              <input required="" name="title" id="title" type="text" />
            </div>
            <div class="form-group">
              <label for="textarea">Write your content here</label>
              <textarea
                required=""
                cols="20"
                rows="200"
                id="textarea"
                name="textarea"
              >
                {" "}
              </textarea>
            </div>
            <button type="submit" class="form-submit-btn">
              Create
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateNote_Card;
