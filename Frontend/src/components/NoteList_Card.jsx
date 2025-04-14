import React, { useEffect, useState } from "react";
import "./style/style.css";
import { FaStar } from "react-icons/fa";
import { TiPin } from "react-icons/ti";

const NoteList_Card = (props) => {
  const [countdown, setCountdown] = useState("");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toUTCString().slice(0, 16);
  };

  const calculateCountdown = () => {
    if (!props.deleteAt) return;

    const deleteTime = new Date(props.deleteAt).getTime();
    const now = Date.now();
    const diff = deleteTime - now;

    if (diff <= 0) {
      setCountdown("Expired");
      return;
    }

    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let label = "Deleting in ";
    if (days > 0) label += `${days}d `;
    if (hours > 0 || days > 0) label += `${hours}h `;
    label += `${minutes}m`;

    setCountdown(label.trim());
  };

  useEffect(() => {
    calculateCountdown(); // Initial calculation

    const interval = setInterval(() => {
      calculateCountdown();
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [props.deleteAt]);

  return (
    <>
      <div className="note-list-card">
        {props.deleteAt && (
          <span className="flex items-center text-red-500 font-medium mb-1">
            {countdown}
            <TiPin className="ml-2 text-[20px]" />
          </span>
        )}
        <div className="flex items-start justify-between">
          <h3 className="note-list-card-title">
            {props.title ? props.title : "Title"}
          </h3>
          <FaStar />
        </div>
        <p className="note-list-card-description">
          {props.description
            ? props.description.slice(0, 120)
            : "No content to show"}
        </p>
        <div className="flex items-center">
          <time className="note-list-card-date">
            {props.createdDate ? formatDate(props.createdDate) : "No Date"}
          </time>
          {props.favorite ? <FaStar className="ml-4 text-[18px]" /> : ""}
        </div>
      </div>
    </>
  );
};

export default NoteList_Card;
