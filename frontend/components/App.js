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

    resetForm = () => {
      this.setState({ ...this.state, todoNameInput: ""})
    }

    setAxiosResponseError = err => {
      this.setState({ ...this.state, error: err.response.data.message})
    }

    postNewTodo = () => {
      axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(err => {
        this.setAxiosResponseError(err)
      })
    }

    onTodoFormSubmit = event => {
      event.preventDefault()
      this.postNewTodo()
    }

    fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{
      // console.log(res.data.data)
      
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setAxiosResponseError(err)
    })
  }

    toggleCompleted = id => () => {
      axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState( {...this.state, todos: this.state.todos.map(val => {
          if (val.id !== id) return val
          return res.data.data
        })})
      })
      .catch(err => {
        this.setAxiosResponseError(err)
      })
    }

  componentDidMount() {
    this.fetchAllTodos()
    // console.log("Mounted")
  }


  render() {
    // console.log(this.state, "Rendered")
    return (
      <>
        <h1>{this.state.error}</h1>
        <h2>Todos: </h2>
        {
          this.state.todos.map(val => {
            return <div onClick={this.toggleCompleted(val.id)} key={val.id}>{val.name} {val.completed ? "✔️" : ""}</div>
          })
        }
        <form onSubmit={this.onTodoFormSubmit}>
          <Form todos={this.state.todos} />
          <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </>
    )
  }
}
