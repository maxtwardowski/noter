import React, { Component } from 'react'
import axios from 'axios'
import { API_ADDRESS } from '../constant/server'
import { connect } from 'react-redux'
//import Redirect from 'react-router-dom/Redirect'
import { withRouter } from "react-router-dom";

import { getNotes } from '../actions'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getNotes: () => dispatch(getNotes())
})

class Note extends Component {

  componentWillMount() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
      date_create: this.props.datecreate,
      date_edit: this.props.dateedit,
      expanded: false,
      edited: false,
      title_new: this.props.title,
      content_new: this.props.content,
      toNotebook: false
    })
  }

  constructor(props) {
    super(props)

    this.handleExpand = this.handleExpand.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSaveChanges = this.handleSaveChanges.bind(this)
    this.handleCancelChanges = this.handleCancelChanges.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleExpand = e => {
    e.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleEdit = e => {
    e.preventDefault()
    this.setState({
      edited: true
    })
  }

  handleSaveChanges = e => {
    e.preventDefault()
    axios.patch(`${API_ADDRESS}/notes`, {
      'id': this.state.id,
      'title': this.state.title_new,
      'content': this.state.content_new,
      'headers': {
        'Authorization': localStorage.getItem('token')
      }
    }).then(() => {
      this.props.getNotes()
      this.setState({
        toNotebook: true
      })
    })
  }

  handleCancelChanges = e => {
    e.preventDefault()
    this.setState({
      edited: false
    })
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRemove = e => {
    e.preventDefault()
    axios.delete(`${API_ADDRESS}/notes`, {
      'headers': {
        'Authorization': localStorage.getItem('token')
      },
      data: {
        id: this.state.id
      }
    }).then(() => {
      this.setState({
        toNotebook: true
      })
    })

  }

  render() {
    /*if (this.state.toNotebook) {
      return (
        <Redirect to="/notebook" />
      )
    }*/
    return(
      <div>
        <button className="linkbutton" onClick={e => this.handleExpand(e)}>
          <h4>{this.state.title}</h4>
        </button>
        {this.state.expanded &&
          <div>
            <p>{this.state.content}</p>
            <p><i>Created: {this.state.date_create}</i></p>
            {this.state.date_edit &&
              <p><i>Last edit: {this.state.date_edit}</i></p>
            }
            {!this.state.edited &&
              <div>
                <button className="linkbutton" onClick={e => this.handleEdit(e)}>
                  <p style={{color: "blue"}}>
                    <i>Edit</i>
                  </p>
                </button>
                <button className="linkbutton" onClick={e => this.handleRemove(e)}>
                  <p style={{color: "blue"}}>
                    <i>Remove</i>
                  </p>
                </button>
              </div>
            }
            {this.state.edited &&
              <form>
                <p>
                  <input
                    type="text"
                    name="title_new"
                    value={this.state.title_new}
                    onChange={e => this.handleOnChange(e)}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    name="content_new"
                    value={this.state.content_new}
                    onChange={e => this.handleOnChange(e)}
                  />
                </p>
                <p>
                  <button onClick={e => this.handleSaveChanges(e)}>Save</button>
                  <button onClick={e => this.handleCancelChanges(e)}>Cancel</button>
                </p>
              </form>
            }
          </div>
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(Note)
);