import React from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi2";
import "../utils/style/utils.css";
import NoteList_Card from "./NoteList_Card";

const NotesList = ({ allNotes, getSingleNote, openCreateCard }) => {
  return (
    <>
      <div className="notes-list-div space-y-10">
        <div className="search-bar">
          <CiSearch className="show-icons-style search-icon" />
          <input className="input" type="text" placeholder="Search" />
          <button onClick={openCreateCard} className="create-btn">
            <HiOutlinePlus />
          </button>
        </div>
        <div className="notes-mapping-div space-y-2">
          <h4>All Notes</h4>
          <div className="mapping-container">
            {allNotes.length > 0 ? (
              allNotes.map((e) => {
                return (
                  <div key={e._id} onClick={() => getSingleNote(e._id)}>
                    <NoteList_Card
                      title={e.title}
                      description={e.description}
                      deleteAt={e.deleteAt}
                      createdDate={e.createdAt}
                    />
                  </div>
                );
              })
            ) : (
              <h4>No saved notes</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesList;
