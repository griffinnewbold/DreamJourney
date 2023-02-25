import React, {useState, useRef} from "react"
import axios from "axios"
import {Link} from "react-router-dom";
import LoginError from '../LoginError'

export default function Login() {

  const [stateData, setStateData] = useState([]);

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
      setStateData([String(response.data["validate"])])
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
      </form>
      <Link to="/create"> {"Create your account"} </Link>
      <p>{stateData}</p>
      <LoginError validate={stateData}/>
    </>
  )
}
