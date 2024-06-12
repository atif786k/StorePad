import React from "react";
import Navigation from "./Navigation";
import NoteShow from "./NoteShow";
import NoteDetail from "./NoteDetail";
import "./style/mainFrame.css";

const MainFrame = () => {
  return (
    <div className="main-frame">
      <Navigation />
      <NoteShow />
      <NoteDetail />
    </div>
  );
};

export default MainFrame;
