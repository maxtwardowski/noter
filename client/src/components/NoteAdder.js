import React, { Component } from 'react'
import axios from 'axios'

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.post('http://localhost:5000/newnote', {
      title: this.state.title,
      content: this.state.content
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <p><input type="text" name="title" placeholder="Title" onChange={e => this.handleChange(e)} /></p>
          <p><input type="text" name="content" placeholder="Let's note something..." onChange={e => this.handleChange(e)} /></p>
          <p><button>Save</button></p>
        </form>
      </div>
    )
  }
}

export default NoteAdder;