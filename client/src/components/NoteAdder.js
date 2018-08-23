import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { API_ADDRESS } from '../constant/server'

const mapStateToProps = state => (
  {
    user: state.user
  }
)

class NoteAdder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getUser = () => (
    this.props.user
  )

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post(`${API_ADDRESS}/newnote`, {
      user: this.getUser(),
      title: this.state.title,
      content: this.state.content
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={e => this.handleChange(e)}
            />
          </p>
          <p>
            <input
              type="text"
              name="content"
              placeholder="Let's note something..."
              onChange={e => this.handleChange(e)}
            />
          </p>
          <p><button>Save</button></p>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(NoteAdder);