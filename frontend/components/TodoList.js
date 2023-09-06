import React from 'react'
import Todo from "./todo"


export default class TodoList extends React.Component {
  render() {
    console.log(this.props.todos)
    return (
      <>
      <div>
        {this.props.todos.todos.data.map(val => {
          {console.log(val, "Im mapping!")}
         <Todo />
        })}
      </div>
      </>
    )
  }
}
