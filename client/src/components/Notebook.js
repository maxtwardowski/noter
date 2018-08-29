import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadNotes } from '../actions'
import axios from 'axios'
import { API_ADDRESS } from '../constant/server'
import Note from './Note'

const mapStateToProps = state => ({
    user: state.user,
    notes: state.notes
})

const mapDispatchToProps = dispatch => ({
    loadNotes: notes => dispatch(loadNotes(notes))
})

class Notebook extends Component {
  componentDidUpdate = () => {
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
            <li key={note.id}>
              <Note
                id={note.id}
                title={note.title}
                content={note.content}
                datecreate={note.date_create}
                dateedit={note.date_edit}
              />
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