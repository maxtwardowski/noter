import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadNotes } from '../actions'
import axios from 'axios'
import { API_ADDRESS } from '../constant/server'

const mapStateToProps = state => ({
    user: state.user,
    notes: state.notes
})

const mapDispatchToProps = dispatch => ({
    loadNotes: notes => dispatch(loadNotes(notes))
})

class Notebook extends Component {
  componentDidMount = () => {
    axios.get(`${API_ADDRESS}/notes`, {
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
              {note.date_edit &&
                <p><i>Last edit: {note.date_edit}</i></p>
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook);