import React, { useEffect, useState } from "react";
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
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, [props.deleteAt]);

  const truncateText = (text, maxLength) => {
    if (!text) return "No content";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-[#191919] rounded-[1rem] p-4 hover:bg-[#0f0f0f] transition-colors duration-200 border border-[#252525]">
      {props.deleteAt && (
        <div className="flex items-center text-red-400 text-sm font-medium mb-2">
          <span>{countdown}</span>
          <TiPin className="ml-2 w-4 h-4" />
        </div>
      )}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {props.title || "Untitled Note"}
        </h3>
        <FaStar
          className={`text-lg ${
            props.activeView === "favorites" || props.isFavorite
              ? "text-pink-600"
              : "text-white"
          } transition-colors duration-200`}
        />
      </div>
      <p className="text-[#99999b] text-sm line-clamp-2 mb-3 whitespace-pre-wrap">
        {truncateText(props.description, 80)}
      </p>
      <div className="flex items-center justify-between">
        <time className="text-xs text-[#99999b]">
          {props.createdDate ? formatDate(props.createdDate) : "No Date"}
        </time>
      </div>
    </div>
  );
};

export default NoteList_Card;
