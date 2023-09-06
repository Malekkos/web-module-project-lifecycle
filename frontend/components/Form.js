import React from 'react'
import TodoList from "./TodoList"


export default class Form extends React.Component {
  
  render() {
    console.log(this.props, "Props are found!")
    return (
      <>
      <div>
        <h1>Hello</h1>
        <h2>{this.props.todos.message}</h2>
        <TodoList />
      </div>
      </>
    )
  }
}
