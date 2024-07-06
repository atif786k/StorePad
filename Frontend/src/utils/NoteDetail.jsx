import React from "react";
import "./style/utils.css";
import ShowNote_Card from "../components/ShowNote_Card";
import CreateNote_Card from "../components/CreateNote_Card";
import EditNote_Card from "../components/EditNote_Card";
import { FaRegStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const NoteDetail = ({
  logOutFunction,
  deleteFunction,
  getNotesFunction,
  singleNote,
  isPopupVisibleAdd,
  isPopupVisibleEdit,
  popupFunctionAdd,
  popupFunctionEdit
}) => {
  
  

  return (
    <>
      <div className="note-detail-container">
        <nav className="note-tools">
          <button className="like-btn tool-btns">
            <FaRegStar className="tool-icons-style"/>
            {/* Favorite */}
          </button>
          <button onClick={()=>popupFunctionEdit()} className="edit-btn tool-btns">
            <FiEdit2 className="tool-icons-style" />
            {/* Edit */}
          </button>
          <button
            onClick={() => deleteFunction()}
            className="delete-btn tool-btns"
          >
            <MdOutlineDelete className="tool-icons-style"/>
            {/* Delete */}
          </button>
          <button
            onClick={() => logOutFunction()}
            className="logout-btn tool-btns styling-btn"
          >
            <AiOutlineLogout className="tool-icons-style log-out-style" />
            LogOut
          </button>
        </nav>

        <main className="function-container">
        {isPopupVisibleAdd && (
            <CreateNote_Card
              getAllNotesFunction={getNotesFunction}
              popupFunctionAdd={popupFunctionAdd}
            />
          )}
          {isPopupVisibleEdit && (
            <EditNote_Card popupFunctionEdit={popupFunctionEdit} getAllNotesFunction={getNotesFunction} noteData={singleNote}/>
          )}
          <ShowNote_Card
          singleNote={singleNote}
          />
        </main>
      </div>
    </>
  );
};

export default NoteDetail;
