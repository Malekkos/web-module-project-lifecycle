import React from 'react'
import axios from "axios"
import Form from "./Form"

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  constructor() {
    //receiving my todos from the api, should copy onto state
    super()
    this.state = []
  }
  
  componentDidMount() {
    axios.get(URL)
    .then(res =>{
      // console.log(res.data.data)
      console.log("Mounted")
      this.setState({ ...res.data.data})
    })
  }


  render() {
    console.log(this.state, "Rendered")
    return (
      <>
        <Form  />
      </>
    )
  }
}
