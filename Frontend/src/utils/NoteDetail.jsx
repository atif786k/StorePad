import React from "react";
import "./style/utils.css";
import { CiStar } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineLogout } from "react-icons/ai";
import ShowNote_Card from "../components/ShowNote_Card";
import CreateNote_Card from "../components/CreateNote_Card";

const NoteDetail = ({
  logOutFunction,
  deleteFunction,
  getNotesFunction,
  singleNote,
  isPopupVisible,
  popupFunction,
}) => {
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toUTCString();
  };

  return (
    <>
      <div className="note-detail-container">
        <nav className="note-tools">
          <button className="like-btn tool-btns">
            <CiStar className="tool-icons-style" />
            Favorite
          </button>
          <button className="edit-btn tool-btns">
            <FiEdit2 className="tool-icons-style" />
            Edit
          </button>
          <button
            onClick={() => deleteFunction()}
            className="delete-btn tool-btns"
          >
            <AiOutlineDelete className="tool-icons-style" />
            Delete
          </button>
          <button
            onClick={() => logOutFunction()}
            className="logout-btn tool-btns"
          >
            <AiOutlineLogout className="tool-icons-style" />
            LogOut
          </button>
        </nav>

        <main className="function-container">
          {isPopupVisible && (
            <CreateNote_Card
              getAllNotesFunction={getNotesFunction}
              popupFunction={popupFunction}
            />
          )}
          <ShowNote_Card
            title={singleNote.title}
            description={singleNote.description}
            createdDate={formatDate(singleNote.createdOn)}
          />
        </main>
      </div>
    </>
  );
};

export default NoteDetail;
