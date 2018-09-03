import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotes } from '../actions'
import Note from './Note'

const mapStateToProps = state => ({
  user: state.user,
  notes: state.notes
})

const mapDispatchToProps = dispatch => ({
  getNotes: () => dispatch(getNotes())
})

class Notebook extends Component {
  componentDidMount () {
    this.props.getNotes()
  }

  render() {
    if (this.props.notes === undefined || this.props.notes.length === 0) {
      return (
        <div>
          <h3>You don't have any notes yet!</h3>
        </div>
      )
    } else {
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
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notebook);