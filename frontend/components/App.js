import React from 'react'
import axios from "axios"
import Form from "./Form"
import TodoList from "./TodoList"
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

    //receiving my todos from the api, should copy onto state
  
    state = {
      todos: [],
      error: "",
      todoNameInput: "",
      displayCompleteds: true,
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

    toggleDisplayCompleteds = () => {
      this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds})
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
        
        <TodoList
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit}
        onTodoNameInputChange={this.onTodoNameInputChange}
        toggleDisplayCompleteds={this.toggleDisplayCompleteds}
        todoNameInput={this.state.todoNameInput}
        displayCompleteds={this.state.displayCompleteds}
        />
      </>
    )
  }
}
