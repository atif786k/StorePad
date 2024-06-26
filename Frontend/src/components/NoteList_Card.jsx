import React from "react";

const NoteList_Card = (props) => {
  return (
    <>
      <div className="note-list-card">
        <h3 className="note-list-card-title">
          {props.title ? props.title : "Title"}
        </h3>
        <p className="note-list-card-description">
          {props.description ? props.description : "No content to show"}
        </p>
        <time
          className="note-list-card-date"
          dateTime={new Date().toISOString().split("T")[0]}
        >
          {props.createdDate
            ? props.createdDate
            : new Date().toISOString().split("T")[0]}
        </time>
      </div>
    </>
  );
};

export default NoteList_Card;
