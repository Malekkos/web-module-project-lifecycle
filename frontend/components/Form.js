import React from 'react'
import TodoList from "./TodoList"


export default class Form extends React.Component {
  
  render() {
    
    // console.log(this.props, "Props are found!")
    return (
      <>
        <form onSubmit={this.props.onTodoFormSubmit}>
          <input 
          value={this.props.todoNameInput} 
          onChange={this.props.onTodoNameInputChange} 
          type="text" 
          placeholder="Type todo">
          </input>
          <input type="submit"></input>
        </form>
        <button onClick={this.props.toggleDisplayCompleteds}>{this.props.displayCompleteds ? "Hide" : "Show"} Completed</button>
      </>
    )
  }
}
