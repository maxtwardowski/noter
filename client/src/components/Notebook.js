import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    notes: state.notes
  }
);

const Notebook = ({ notes }) => (
  <div>
    <ul>
      {notes.map(note => (
        <li key={note}>
          {note}
        </li>
      ))}
    </ul>
  </div>
)

export default connect(mapStateToProps)(Notebook);