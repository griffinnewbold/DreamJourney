import React, {useState, useRef} from "react"
import axios from "axios"
import {Link} from "react-router-dom";
import LoginError from '../LoginError'
import Dashboard from './Dashboard'

export default function Login() {

  const [stateData, setStateData] = useState(["undefined"]);

  // Input references.
  const emailRef = useRef()
  const passwordRef = useRef()

  function fetchPaths(event) {  

    event.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (email === "" || password === "") return

    emailRef.current.value = null
    passwordRef.current.value = null
    axios.post(
      "http://127.0.0.1:8000/login", 
      {
        email: email, 
        password: password
      }
    ).then(response => {
      setStateData([{
        "validate": String(response.data["validate"]), 
        "email": email, 
        "password": password, 
        "data": response.data["dreams"]}])
    })
  }

  const titleStyle = {
    textAlign: "center", 
    fontSize: "40px"
  }

  const divStyle = {
    textAlign: "center",
  }

  const descripStyle = {
    textAlign: "center", 
    fontSize: "18px"
  }

  if (stateData[0] === "undefined" || stateData[0]["validate"] === "false")
  return (
    <>
      <h1 style={titleStyle}>
        {"Dream Journey"}
      </h1>
      <p style={descripStyle}>
        {"Griffin uses dark mode"}
      </p>
      <form style={divStyle}>
        <label>Email:</label>
        <input type="text"  ref={emailRef} name="email"/><br></br>

        <label>Password:</label>
        <input type="text" ref={passwordRef} name="password"/><br></br>
        <button onClick={fetchPaths}>Submit</button>
        <LoginError validate={stateData[0]["validate"]}/>
      </form>
      <button onClick={transferPage}>Create Account</button>
      <Dashboard data={stateData[0]}/>
    </>
  )

  return (
    <>
      <h1 style={titleStyle}>
        {"Dream Journey"}
      </h1>
      <h2>
        {"Welcome"}
      </h2>
      <p style={descripStyle}>
        {"Griffin uses dark mode"}
      </p>
      <Dashboard data={stateData[0]}/>
    </>
  )

  function transferPage(){
    window.location.href = window.location.href + "create"
  }
}
