import React from 'react'

const Note = props => (
  <div>
    <h4>{props.note.title}</h4>
    <p>{props.note.content}</p>
    <p><i>Created: {props.note.date_create}</i></p>
    {props.note.date_edit &&
      <p><i>Last edit: {props.note.date_edit}</i></p>
    }
  </div>
)

export default Note;