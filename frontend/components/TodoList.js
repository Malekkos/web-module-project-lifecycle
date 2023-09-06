import React from 'react'
// import Todo from "./Todo"


export default class TodoList extends React.Component {
  render() {
    return (
      <>
      <div>
      <h2>Todos: </h2>
        {
          this.props.todos.reduce((acc, val) => {
            if (this.props.displayCompleteds || !val.completed) return acc.concat(
              <div onClick={this.props.toggleCompleted(val.id)} key={val.id}>{val.name} {val.completed ? "✔️" : ""}</div>
            )
            return acc
          }, [])
        }
      </div>
      </>
    )
  }
}
