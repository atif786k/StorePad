import React from 'react'

const NoteList_Card = () => {
  return (
    <>
    <div className='note-list-card'>
        <h3 className='note-list-card-title'>Title</h3>
        <p className='note-list-card-description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, fugit?</p>
        <time className='note-list-card-date' dateTime={new Date().toISOString().split('T')[0]}>{new Date().toISOString().split('T')[0]}</time>
    </div>
    </>
  )
}

export default NoteList_Card