import React from 'react'
import axios from "axios"
import Form from "./Form"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

    //receiving my todos from the api, should copy onto state
  
    state = {
      todos: [],
    }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{
      // console.log(res.data.data)
      
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchAllTodos()
    console.log("Mounted")
  }


  render() {
    console.log(this.state, "Rendered")
    return (
      <>
        <Form todos={this.state.todos} />
      </>
    )
  }
}
