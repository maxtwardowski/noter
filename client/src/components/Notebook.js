import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadNotes } from '../actions'
import axios from 'axios'

const mapStateToProps = state => (
  {
    user: state.user,
    notes: state.notes
  }
)

const mapDispatchToProps = dispatch => (
  {
    loadNotes: notes => dispatch(loadNotes(notes))
  }
)

class Notebook extends Component {

  componentDidMount = () => {
    axios.get('http://localhost:5000/getnotes', {
      'headers': {
        'user': this.getUser()
      }
    }).then(res => {
      this.props.loadNotes(res.data)
    })
  }

  getUser = () => (
    this.props.user
  )

  getNotes = () => (
    this.props.notes
  )

  render() {
    return (
      <div>
        <ul>
          {this.props.notes.map(note => (
            <li key={note.title}>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <p><i>Created: {note.date_create}</i></p>
              <p><i>Last edit: {note.date_edit}</i></p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notebook);

/*

*/