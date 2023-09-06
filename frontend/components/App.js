import React from 'react'
import axios from "axios"
import Form from "./Form"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

    //receiving my todos from the api, should copy onto state
  
    state = {
      todos: [],
      error: "",
      todoNameInput: "",
    }

    onTodoNameInputChange = event => {
      const { value } = event.target
      this.setState({ ...this.state, todoNameInput: value})
    }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{
      // console.log(res.data.data)
      
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message})
    })
  }

  componentDidMount() {
    this.fetchAllTodos()
    console.log("Mounted")
  }


  render() {
    console.log(this.state, "Rendered")
    return (
      <>
        <h1>{this.state.error}</h1>
        <h2>Todos: </h2>
        {
          this.state.todos.map(val => {
            return <div key={val.id}>{val.name}</div>
          })
        }

        <Form todos={this.state.todos} />
        <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder="Type todo"></input>
        <input type="submit"></input>
        <button>Clear Completed</button>
      </>
    )
  }
}
