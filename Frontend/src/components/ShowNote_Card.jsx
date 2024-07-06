import React from "react";
import "./style/style.css";

const ShowNote_Card = ({ singleNote }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toUTCString().slice(0, 16);
  };
  return (
    <>
      <main className="show-note-card">
        <h1 className="show-note-card-title">
          {singleNote.title ? singleNote.title : "Nothing to show"}
        </h1>
        <p className="show-note-card-content">
          {singleNote.description
            ? singleNote.description
            : ""}
        </p>
        <h2>{singleNote.createdOn ? formatDate(singleNote.createdOn) : ""}</h2>
      </main>
    </>
  );
};

export default ShowNote_Card;
