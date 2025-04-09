import React from "react";
import "./style/style.css";
import { FaStar } from "react-icons/fa";

const NoteList_Card = (props) => {
  return (
    <>
      <div className="note-list-card">
        <h3 className="note-list-card-title">
          {props.title ? props.title : "Title"}
        </h3>
        <p className="note-list-card-description">
          {props.description
            ? props.description.slice(0, 120)
            : "No content to show"}
        </p>
        <div className="flex items-center">
          <time className="note-list-card-date">
            {props.createdDate ? props.createdDate : "No Date"}
          </time>
          {props.favorite ? <FaStar className="ml-4 text-[18px]"/> : ""}
          
        </div>
      </div>
    </>
  );
};

export default NoteList_Card;
