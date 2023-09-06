import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <>
      <div 
      onClick={this.props.toggleCompleted(this.props.val.id)} 
      >
        {this.props.val.name} {this.props.val.completed ? "✔️" : ""}
      </div>
      </>
    )
  }
}
