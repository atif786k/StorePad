import React, { useState, useEffect } from "react";
import "./style/utils.css";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi2";
import NoteList_Card from "../components/NoteList_Card";
import axios from "../axios";
import { Link } from "react-router-dom";

const NoteShow = (props) => {
  // const [allNotes, setAllNotes] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/note/fetch-note");
  //     if(response.data && response.data.notes){
  //       setAllNotes(response.data.notes);
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.errorMsg);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  //   return () => {}
  // }, [])

  return (
    <>
      <div className="notes-show-container">
        <div className="search-notes">
          <CiSearch className="show-icons-style search-icon" />
          <input className="input" type="text" placeholder="Search" />
          <button className="create-btn">
            <HiOutlinePlus className="show-icons-style" />
          </button>
        </div>
        <div className="notes-list">
          <h1 className="notes-list-title">All Notes</h1>
          <div className="scroll-container">
            {props.allNotes.map((e) => {
              return (
                <div key={e._id}>
                    <NoteList_Card
                      title={e.title}
                      description={e.description}
                      createdDate={e.createdOn}
                    />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteShow;
